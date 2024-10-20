module.exports = (sequelize, Sequelize) => {
    const Queue = sequelize.define("queue", {
      function: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      full_file_path: {
        type: Sequelize.STRING
      },
      enabled: {
        type: Sequelize.BOOLEAN
      }
    });  
    return Queue;
  };
  