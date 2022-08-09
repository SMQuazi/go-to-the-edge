CREATE MIGRATION m1tzeckvbz77y7xuipqqw7txbcortuprcm6cdrlo6injrkx7jsdxna
    ONTO m1ia56536fqboktw7wyy6hjd4tbhr5ipaj67gr24hp6svavqnvk6za
{
  CREATE TYPE default::Users {
      CREATE REQUIRED PROPERTY password -> std::str;
      CREATE REQUIRED PROPERTY username -> std::str;
  };
};
