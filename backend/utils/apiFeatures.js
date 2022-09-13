class APIFeatures {
    constructor(query, queryStr){
        this.query = query  // query represents database query
        this.queryStr = queryStr    // queryStr represents URL queries
    }

    search(){
        // ternary operator is used, if keyword exist, then only search
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'   // i means case-insensitive
            }
        } : {}

        // console.log(keyword)

        this.query = this.query.find({...keyword})
        return this
    }

    filter(){
        // we store queryStr in new variable,
        // because we don't want to modify original queryStr.
        const queryCopy = {...this.queryStr}   // unpacking object(Spread Syntax)

        // Removing fields from the query string
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el])

        // console.log(queryCopy);

        // Advanced Filter for Range Queries
        // 2000 <= price <= 5000, 3.5 < rating <= 5 etc.

        // convert JSON query to string
        let querystr = JSON.stringify(queryCopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        // console.log(querystr);

        // convert it back to JSON format.
        this.query = this.query.find(JSON.parse(querystr));

        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)

        return this
    }
}

module.exports = APIFeatures


// This class has been implemented for search, filter and pagination.