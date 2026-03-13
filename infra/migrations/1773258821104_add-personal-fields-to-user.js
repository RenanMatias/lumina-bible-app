exports.up = (pgm) => {
  pgm.addColumn("users", {
    firstname: {
      type: "varchar(60)",
    },

    lastname: {
      type: "varchar(60)",
    },
  });
};

exports.down = false;
