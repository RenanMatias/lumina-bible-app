exports.up = (pgm) => {
  pgm.addColumn("scripture_verses", {
    paragraph: {
      type: "integer",
      notNull: true,
      default: 1,
    },
  });
};

exports.down = false;
