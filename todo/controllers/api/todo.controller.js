import models from '../../models'
const { Op } = require("sequelize");

const find = async (req, res, next) => {
  try {
    const list = await models.Todo.findAll({});
    let total = Math.ceil(list.length/5);
    let page = req.query.page;
    let offset = 0;

    if(page > 1){
      offset = 5 * (page - 1);
    }
    const todos = await models.Todo.findAll({
      order : [['id', 'DESC']],
      offset : offset,
      limit : 5
    });
    let data = {
      data : todos, 
      result : "S000",
      page : page,
      offset : 5,
      lastpage : total
    };

    return res.json(data)
  } catch (e) {
    console.log(e);
    next(e)
  }
}

const ins = async (req, res, next) => {
  try {
    
    const todos = await models.Todo.create({
      title : req.body.title,
      status : req.body.status,
      reference : req.body.reference
    }).then(result => {
      let data = {
        result : "S000"
      };
      return res.json(data);
    })
  } catch (e) {
    console.log(e);
    next(e)    
  }
}

const show = async (req, res, next) => {
  try {
    let todoId = req.query.i;
    console.log("todoId L : " + todoId);
    const todo = await models.Todo.findOne({where : {id : todoId}});
    let data = {
      data : todo, 
      result : "S000"
    };

    return res.json(data)
  } catch (e) {
    console.log(e);
    next(e)
  }
}

const upd = async (req, res, next) => {
  try {
    let todoId = req.query.i;
    let referList = await models.Todo.findOne({where : {id : todoId}});
    let refer = referList.reference;
    if(req.body.type) {
      if(refer) {
        let referArr = refer.split(",");

        for(var i=1; i<referArr.length; i++) {
          let reId = referArr[i];
          let referList = await models.Todo.findOne({where : {id : reId}});
          console.log(reId);
          if(referList.status == 0) {
            let data = {result : "E000"};
            return res.json(data);
            }
          }
        }
        const todos = await models.Todo.update({
          title : req.body.title,
          status : req.body.status,
          reference : req.body.reference
        },{
          where : {
            id : todoId
          }
        }).then(result => {
          let data = {
            result : "S000"
        };
          return res.json(data);
        });
          
    } else {
      const todos = await models.Todo.update({
        title : req.body.title,
        status : req.body.status,
        reference : req.body.reference
      },{
        where : {
          id : todoId
        }
      }).then(result => {
        let data = {
          result : "S000"
      };
      return res.json(data);
      });
    }
  } catch (e) {
    console.log(e);
    next(e)    
  }
}

const del = async (req, res, next) => {
  try {
    let todoId = req.query.i;
    console.log("todoId : " + todoId);
    const todo = await models.Todo.findOne({
      where : {
        reference : {
          [Op.like] : "%" + todoId + "%"
        }
      },
      raw : true
    });
    // let keys = Object.keys(todo).length;
    // console.log(keys);
    if (todo != null) {
        let data = {
          result : "ER001"
        };
        return res.json(data);
      } else {
        const todos = await models.Todo.destroy({
          where : {
            id : todoId
          }
        }).then(result => {
          let data = {
            result : "S000"
          };
          return res.json(data);
        })
      }
    
  } catch (e) {
    console.log(e);
    next(e)    
  }
}

const search = async (req, res, next) => {
  try {
    const list = await models.Todo.findAll();
    let total = Math.ceil(list.length/5);
    // let total = list.length;
    let page = req.query.page;
    let offset = 0;

    if(page > 1){
      offset = 5 * (page - 1);
    }

    let category = req.body.searchCategory;
    let searchStr = req.body.searchStr;
    console.log("category : " + category);
    console.log("searchStr : " + searchStr);
    let result = "S000";
    switch (category) {
      case '1':
        let todoList = await models.Todo.findOne({
          where : {
            id : searchStr
          },
          order : [['id', 'DESC']],
          offset : offset,
          limit : 5
        });
        if(todoList == null) {
          result = "ER000";
        }
        let data = {
          result : result,
          data : [todoList],
          page : page,
          offset : 5,
          lastpage : total
        };
        return res.json(data);
        break;
      case '2':
        todoList = await models.Todo.findAll({
          where : {
            title : {
              [Op.like] : "%" + searchStr + "%"
            }
          },
          order : [['id', 'DESC']],
          offset : offset,
          limit : 5
        });
        if(todoList == null) {
          result = "ER000";
        }
        data = {
          result : result,
          data : todoList,
          page : page,
          offset : 5,
          lastpage : total
        };
        return res.json(data);
        break;
      case '3':
        let today = new Date(searchStr);
        let to = new Date(today.setDate(today.getDate() + 1));
        let tomorrow = searchTimeConvert(to);
        console.log("searchStr : " + searchStr);
        console.log("tomorrow : " + tomorrow);
        todoList = await models.Todo.findAll({
          where : {
            updatedAt : {
              [Op.between] : [searchStr, tomorrow]
            }
          },
          order : [['id', 'DESC']],
          offset : offset,
          limit : 5
        })
        if(todoList == null) {
          result = "ER000";
        }
        data = {
          result : result,
          data : todoList,
          page : page,
          offset : 5,
          lastpage : total
        };
        return res.json(data);
        break;
      case '4':
        today = new Date(searchStr);
        to = new Date(today.setDate(today.getDate() + 1));
        tomorrow = searchTimeConvert(to);
        console.log("searchStr : " + searchStr);
        console.log("tomorrow : " + tomorrow);
        todoList = await models.Todo.findAll({
          where : {
            createdAt : {
              [Op.between] : [searchStr, tomorrow]
            }
          },
          order : [['id', 'DESC']],
          offset : offset,
          limit : 5
        })
        if(todoList == null) {
          result = "ER000";
        }
        data = {
          result : result,
          data : todoList,
          page : page,
          offset : 5,
          lastpage : total
        };
        return res.json(data);
        break;
      case '5':
        todoList = await models.Todo.findAll({
          where : {
            status : searchStr
          },
          order : [['id', 'DESC']],
          offset : offset,
          limit : 5
        })
        if(todoList == null) {
          result = "ER000";
        }
        data = {
          result : result,
          data : todoList,
          page : page,
          offset : 5,
          lastpage : total
        };
        return res.json(data);
        break;
      default:
        data = {
          result : "ER000"
        }
        return res.json(data)
        break;
    }
  } catch (e) {
    console.log(e);
    next(e)
  }
}

// 날짜변환 함수
function searchTimeConvert(time) {
  var timestamp = new Date(time);
  var year = timestamp.getFullYear();
  var month = timestamp.getMonth()+1;
  var date = timestamp.getDate();
  var today = year+"-"+month+"-"+date;
  return today;
}

export {
  find,
  ins,
  upd,
  del,
  search,
  show
}