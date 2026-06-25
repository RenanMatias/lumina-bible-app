exports.up = (pgm) => {
  pgm.addColumn("scripture_books", {
    position_in_bible: {
      type: "integer",
      notNull: true,
    },
  });
};

exports.down = false;
