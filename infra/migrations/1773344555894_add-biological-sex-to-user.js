exports.up = (pgm) => {
  pgm.addColumn("users", {
    biological_sex: {
      type: "varchar(10)",
    },
  });

  pgm.addConstraint("users", "biological_sex_check", {
    check: "biological_sex IN ('male', 'female')",
  });
};

exports.down = false;
