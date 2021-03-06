import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import taskType from './taskType'
import taskChartType from './taskChartType'
import task from './taskSchema'

export default {
  tasks: {
    type: new GraphQLList(taskType),
    args: {
      userId: {
        type: GraphQLString
      }
    },
    resolve: task.getListOfTasks
  },
  task: {
    type: taskType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: task.getTaskByPosition
  },
  taskId: {
    type: taskType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: task.getTaskById
  },
  taskByName: {
    type: taskType,
    args: {
      title: {
        type: GraphQLString
      }
    },
    resolve: task.getTaskByName
  },
  chartByCategory: {
    type: taskChartType,
    args: {
      userId: {
        type: GraphQLString
      },
      statusValue: {
        type: GraphQLString
      }
    },
    resolve: task.getChartDataByCategory
  }
};
