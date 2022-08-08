module default {
  type Authors {
    required property first_name -> str;
    required property last_name -> str;
    property middle_name -> str;
    property institution -> str;
    property dob -> datetime;
  }

  type Articles {
    required property title -> str;
    required property content -> str;
    required link author -> Authors;

    required property publish_date -> datetime{
      default := datetime_current()
    };
  }
}
