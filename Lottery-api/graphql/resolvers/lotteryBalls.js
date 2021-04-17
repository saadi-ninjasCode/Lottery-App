const LotteryBalls = require("../../models/lotteryBalls");
const LotteryType = require("../../models/lotteryType");
const { transformLotteryBalls, transformSummary } = require("./transformation");
const { pubsub, DRAW_CREATE, publishToLotteryBalls, publishToDashboardInfo } = require("../../helpers/subscription");
const { withFilter } = require("apollo-server-express");
const { sendNotificationUser, NEW_DRAW } = require("../../helpers/notificationsUtill");

module.exports = {
  Query: {
    lotteryBalls: async (_, args) => {
      console.log("Lottery Balls");
      try {
        const balls = await LotteryBalls.find()
          .sort({ date: -1 })
          .skip((args.page || 0) * args.rows)
          .limit(args.rows);
        return balls.map((ball) => {
          return transformLotteryBalls(ball);
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    lotteryBallsById: async (_, args) => {
      console.log("Lottery Balls by Id");
      try {
        if (args.id) {
          const dataRows = (args.page || 0) * (args.rows || 10);
          const checkLottery = await LotteryType.findById(args.id);
          if (!checkLottery) throw new Error("Lottery doesn't exist");
          const lotteryBalls = await LotteryBalls.find({ lottery: args.id })
            .sort({ date: -1 })
            .skip(dataRows)
            .limit(args.rows);
          const result = await lotteryBalls.map(async (ball) => await transformLotteryBalls(ball));
          const totalDraws = await LotteryBalls.countDocuments({ lottery: args.id });
          return { totalRecords: totalDraws, draws: result };
        } else {
          console.log("No Id");
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    drawCount: async () => {
      console.log("Total Draws");
      try {
        const totalDraws = await LotteryBalls.estimatedDocumentCount();
        return totalDraws;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    createLotteryBalls: async (_, args, context) => {
      console.log("Create New Draw");
      if (!context.req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        const checkLottery = await LotteryType.findById(args.lotteryInput.lottery);
        if (!checkLottery) {
          throw new Error("Lottery doesn't exist");
        }
        const balls = new LotteryBalls({
          lottery: args.lotteryInput.lottery,
          date: args.lotteryInput.date,
          balls: args.lotteryInput.pending ? [] : args.lotteryInput.balls,
          specialBalls: args.lotteryInput.pending ? [] : args.lotteryInput.specialBalls,
          pending: args.lotteryInput.pending,
        });
        const result = await balls.save();
        await sendNotificationUser({
          lotteryId: checkLottery._id,
          userList: checkLottery.user_list,
          title: checkLottery.name,
          message: NEW_DRAW,
        });
        const transformData = await transformLotteryBalls(result);
        publishToLotteryBalls(transformData, "new");
        const dashboardData = await transformSummary(checkLottery);
        publishToDashboardInfo(dashboardData, "new");
        return transformData;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    editLotteryBalls: async (_, args, { req, res }) => {
      console.log("Draw Edit");
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        const checkLottery = await LotteryType.findById(args.lotteryInput.lottery);
        if (!checkLottery) {
          throw new Error("Lottery doesn't exist");
        }
        const getDraw = await LotteryBalls.findOne({ _id: args.lotteryInput._id, lottery: args.lotteryInput.lottery });
        getDraw.date = args.lotteryInput.date;
        getDraw.balls = args.lotteryInput.pending ? [] : args.lotteryInput.balls;
        getDraw.specialBalls = args.lotteryInput.pending ? [] : args.lotteryInput.specialBalls;
        getDraw.pending = args.lotteryInput.pending;
        const result = await getDraw.save();
        //subscription
        const transformData = await transformLotteryBalls(result);
        publishToLotteryBalls(transformData, "edit");
        const dashboardData = await transformSummary(checkLottery);
        publishToDashboardInfo(dashboardData, "edit");
        return transformData;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    deleteDraw: async (_, args, context) => {
      console.log("Delete Draw");
      if (!context.req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        const getDraw = await LotteryBalls.findById(args.id);
        const result = await LotteryBalls.deleteOne({ _id: args.id });
        if (result.ok !== 1) {
          throw new Error("Deletion failed");
        } else {
          const transformData = await transformLotteryBalls(getDraw);
          publishToLotteryBalls(transformData, "remove");
          const checkLottery = await LotteryType.findById(transformData.lottery._id);
          const dashboardData = await transformSummary(checkLottery);
          publishToDashboardInfo(dashboardData, "remove");
          return transformData;
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Subscription: {
    subscribeDraw: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(DRAW_CREATE),
        (payload, args, context) => {
          return payload.subscribeDraw.balls.lottery._id.toString() === args.id;
        }
      ),
    },
  },
};
