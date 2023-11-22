"use strict";
module.exports = (req, res, next) => {
  let search = req.query?.search || {};
  for (let key in search) search[key] = { $regex: search[key], $options: "i" };

  const filter = req.query?.filter || {};

  search = { ...search, ...filter };
  const sort = req.query?.sort || { createdAt: "desc" };
  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20);

  let page = Number(req.query?.page);
  page = (page > 0 ? page : 1) - 1;

  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : page * limit;

  res.getModelList = async (Model, populate = null) => {
    return await Model.find(search)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  res.getModelListDetails = async (Model) => {
    const data = await Model.find(search);
    let details = {
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous1: page > 1 ? page - 1 : false,
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        next1: page < Math.ceil(data.length / limit) - 2 ? page + 3 : false,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;
    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };

  next();
};
