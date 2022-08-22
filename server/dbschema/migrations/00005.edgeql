CREATE MIGRATION m1ia56536fqboktw7wyy6hjd4tbhr5ipaj67gr24hp6svavqnvk6za
    ONTO m1fhlvyrok5dsmcdhn5yl3gofcwzcufurvol6na3c64gwwq34tffjq
{
  ALTER TYPE default::Articles {
      ALTER PROPERTY publish_date {
          SET REQUIRED USING (std::datetime_current());
      };
  };
};
