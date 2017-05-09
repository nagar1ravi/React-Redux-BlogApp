import mongoose from 'mongoose';

var taskSchema = new mongoose.Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  title: String,
  category: String,
  startDate: String,
  dueDate: String,
  taskContent: String
});

let task = mongoose.model('task', taskSchema);

module.exports = task;

module.exports.getListOfTasks = () => {
  return new Promise((resolve, reject) => {
    task.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getTaskById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    task.findOne({
        id: id
    }).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getTaskByName = (root, {title}) => {
  return new Promise((resolve, reject) => {
    task.findOne({
      title: title
    }).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getTaskByPosition = (root, {id}) => {
  return new Promise((resolve, reject) => {
    task.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res[id]);
    });
  });
};

module.exports.getChartDataByCategory = () => {
  return new Promise((resolve, reject) => {
      task.aggregate( 
        {$group:{_id: '$category', count:{$sum:1}}},
        {$project:{tmp:{category:'$_id', count:'$count'}}}, 
        {$group:{_id:null, total:{$sum:'$tmp.count'}, data:{$addToSet:'$tmp'}}}
      )
    .exec((err, res) => {
      console.log(res)
      err ? reject(err) : resolve(res[0]);
    });
  });
};

module.exports.addTask = (root, {title, category, startDate , dueDate , taskContent }) => {
  var newTask = new task({title:title, category:category, startDate:startDate, dueDate:dueDate, taskContent:taskContent});

  return new Promise((resolve, reject) => {
    newTask.save((err, res) => {
      err ? reject(err): resolve(res);
    });
  });
}

module.exports.updateTask = (root, {id, title, category, startDate , dueDate , taskContent }) => {
  var updateTask = {title:title, category:category, startDate:startDate, dueDate:dueDate, taskContent:taskContent};
  return new Promise((resolve, reject) => {
    task.findOneAndUpdate(
        { id: id },
        { $set: updateTask },
        { returnNewDocument: true }
    ).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

module.exports.deleteTask = (root, {id}) => {
  return new Promise((resolve, reject) => {
    task.remove(
        { id: id }
    ).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}