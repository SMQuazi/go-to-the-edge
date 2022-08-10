CREATE MIGRATION m1evgmkhlxhfbvy4ikee4poo3f7yeeqzirzwwcj43zcgmfdwtwh4pq
    ONTO m15gbzr5eihwhbe2zpv36cphi34awwd5ww2wjmlujfj4y2uktfkwya
{
  ALTER TYPE default::Author {
      ALTER PROPERTY last_name {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE default::Author {
      ALTER PROPERTY middle_name {
          RESET OPTIONALITY;
      };
  };
};
