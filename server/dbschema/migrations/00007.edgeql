CREATE MIGRATION m15qcmkondukctsfymyefmnwnjeyhxik2om6yteocp2n6m7pdlofcq
    ONTO m1tzeckvbz77y7xuipqqw7txbcortuprcm6cdrlo6injrkx7jsdxna
{
  ALTER TYPE default::Users {
      ALTER PROPERTY username {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
