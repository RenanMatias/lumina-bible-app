exports.up = (pgm) => {
  pgm.addColumn("users", {
    features: {
      type: "varchar[]",
      notNul: true,
      default: "{}",
    },
  });
};

exports.down = false;
