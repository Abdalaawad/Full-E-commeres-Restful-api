class ApiFeature {
  constructor(mongooseQuery, requestQuery) {
    this.mongooseQuery = mongooseQuery;
    this.requestQuery = requestQuery;
  }

  Filter() {
    const filter = { ...this.requestQuery };
    const exclude = ["limit", "sort", "pagination", "keyword", "search"];
    exclude.forEach((el) => delete filter[el]);
    const querystring = JSON.stringify(filter);
    let query = querystring.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.mongooseQuery.find(JSON.parse(query));
    return this;
  }

  Search(SearchCase) {
    if (SearchCase === "product") {
      if (this.requestQuery.search) {
        const query = {};
        query.$or = [
          { title: { $regex: this.requestQuery.search, $options: `i` } },
          { description: { $regex: this.requestQuery.search, $options: `i` } },
        ];
        this.mongooseQuery.find(query);
      }
    } else {
      if (this.requestQuery.search) {
        const query = {
          name: { regex: this.requestQuery.search },
          Option: `i`,
        };
        this.mongooseQuery.find(query);
      }
    }
    return this;
  }

  Sort() {
    if (this.requestQuery.sort) {
      const sorts = this.requestQuery.sort.split(`,`).join(` `);
      this.mongooseQuery.sort(sorts);
    } else {
      this.mongooseQuery.sort(`-createdAt`);
    }
    return this;
  }
  Pagination() {
    const limit = this.requestQuery.limit * 1 || 20;
    const page = this.requestQuery.page * 1 || 1;
    const skip = (page - 1) * limit;

    const pagination = {
      limit: limit,
      page: page,
      //   skip: skip,
    };

    this.mongooseQuery.find({}).skip(skip).limit(limit);
    return this;
  }

  Field() {
    if (this.requestQuery.fields) {
      const field = this.requestQuery.fields.split(`,`).join(` `);
      this.mongooseQuery.select(field);
    }
    return this;
  }
}
module.exports = ApiFeature;
