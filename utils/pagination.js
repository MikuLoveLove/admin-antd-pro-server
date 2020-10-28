
const paginationFunc = (Model, query, filter, cb) => {
    const {pageSize, current} = query
    Model.find({}, filter).then(dataList => {
        const total =  dataList.length
        let data = { list: [], pageSize: Number(pageSize), current: Number(current), total}
        if (total < pageSize) cb( {...data, current: 1, list: dataList})
        else {
            const list = dataList.filter((item , index) => {
                return pageSize* (current -1) <= index && index < pageSize*current
            })
            cb({...data, list})
        }
    }).catch((err) => {
        cb(null, err)
    })
}

module.exports = {
    paginationFunc
}