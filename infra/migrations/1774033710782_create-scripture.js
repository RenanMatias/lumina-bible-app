exports.up = (pgm) => {
  pgm.createTable("scripture_books", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    language: {
      type: "varchar(30)",
      notNull: true,
    },

    version: {
      type: "varchar(30)",
      notNull: true,
    },

    testament: {
      type: "varchar(30)",
      notNull: true,
    },

    book: {
      type: "varchar(30)",
      notNull: true,
    },

    name: {
      type: "varchar(255)",
      notNull: true,
    },

    short_name: {
      type: "varchar(30)",
      notNull: true,
    },

    author: {
      type: "varchar(30)",
    },

    date_written: {
      type: "text",
    },

    division: {
      type: "text",
    },

    original_language: {
      type: "text",
    },

    summary: {
      type: "text",
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });

  pgm.createTable("scripture_chapters", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    book_id: {
      type: "uuid",
      notNull: true,
    },

    number: {
      type: "integer",
      notNull: true,
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });

  pgm.createTable("scripture_pericopes", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    chapter_id: {
      type: "uuid",
      notNull: true,
    },

    title: {
      type: "text",
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });

  pgm.createTable("scripture_verses", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    pericope_id: {
      type: "uuid",
      notNull: true,
    },

    number: {
      type: "integer",
      notNull: true,
    },

    verse: {
      type: "text",
      notNull: true,
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });
};

exports.down = false;
