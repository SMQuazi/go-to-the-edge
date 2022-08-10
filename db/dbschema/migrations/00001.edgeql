CREATE MIGRATION m15gbzr5eihwhbe2zpv36cphi34awwd5ww2wjmlujfj4y2uktfkwya
    ONTO initial
{
  CREATE TYPE default::Author {
      CREATE PROPERTY dob -> std::datetime;
      CREATE REQUIRED PROPERTY first_name -> std::str;
      CREATE PROPERTY institution -> std::str;
      CREATE REQUIRED PROPERTY last_name -> std::str;
      CREATE REQUIRED PROPERTY middle_name -> std::str;
  };
  CREATE TYPE default::Articles {
      CREATE REQUIRED LINK author -> default::Author;
      CREATE REQUIRED PROPERTY content -> std::str;
      CREATE PROPERTY publish_date -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY title -> std::str;
  };
};
