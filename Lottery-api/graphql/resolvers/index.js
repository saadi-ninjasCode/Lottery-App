
const book = [
    { name: 'AB', id: 12 },
    { name: 'BC', id: 13 }
]

module.exports = {
    book: (args) => {
        if (args.id)
            return book.filter(item => item.id === args.id);
        else
            return book;
    }
}