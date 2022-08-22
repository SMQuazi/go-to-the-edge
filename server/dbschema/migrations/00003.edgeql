CREATE MIGRATION m1i53pzoqeti6j3wktxrlbfvjve2n23vxca5bgcv7h46ugtr5yzvia
    ONTO m1evgmkhlxhfbvy4ikee4poo3f7yeeqzirzwwcj43zcgmfdwtwh4pq
{
  ALTER TYPE default::Author {
      ALTER PROPERTY last_name {
          SET REQUIRED USING (' ');
      };
  };
};
