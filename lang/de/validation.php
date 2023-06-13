<?php

return [

  /*
  |--------------------------------------------------------------------------
  | Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | The following language lines contain the default error messages used by
  | the validator class. Some of these rules have multiple versions such
  | as the size rules. Feel free to tweak each of these messages here.
  |
   */

  'accepted' => 'Das Feld :attribute muss akzeptiert werden.',
  'accepted_if' => 'Das Feld :attribute muss akzeptiert werden, wenn :other gleich :value ist.',
  'active_url' => 'Das Feld :attribute ist keine gültige URL.',
  'after' => 'Das Feld :attribute muss ein Datum nach dem :date sein.',
  'after_or_equal' => 'Das Feld :attribute muss ein Datum nach oder gleich dem :date sein.',
  'alpha' => 'Das Feld :attribute darf nur Buchstaben enthalten.',
  'alpha_dash' => 'Das Feld :attribute darf nur Buchstaben, Zahlen, Bindestriche und Unterstriche enthalten.',
  'alpha_num' => 'Das Feld :attribute darf nur Buchstaben und Zahlen enthalten.',
  'array' => 'Das Feld :attribute muss ein Array sein.',
  'ascii' => 'Das Feld :attribute darf nur einfach-byte alphanumerische Zeichen und Symbole enthalten.',
  'before' => 'Das Feld :attribute muss ein Datum vor dem :date sein.',
  'before_or_equal' => 'Das Feld :attribute muss ein Datum vor oder gleich dem :date sein.',
  'between' => [
    'array' => 'Das Feld :attribute muss zwischen :min und :max Elemente enthalten.',
    'file' => 'Das Feld :attribute muss zwischen :min und :max Kilobyte groß sein.',
    'numeric' => 'Das Feld :attribute muss zwischen :min und :max liegen.',
    'string' => 'Das Feld :attribute muss zwischen :min und :max Zeichen lang sein.',
  ],
  'boolean' => 'Das Feld :attribute muss true oder false sein.',
  'confirmed' => 'Die Bestätigung des Feldes :attribute stimmt nicht überein.',
  'current_password' => 'Das Passwort ist falsch.',
  'date' => 'Das Feld :attribute ist kein gültiges Datum.',
  'date_equals' => 'Das Feld :attribute muss dem Datum :date entsprechen.',
  'date_format' => 'Das Feld :attribute entspricht nicht dem Format :format.',
  'decimal' => 'Das Feld :attribute muss :decimal Nachkommastellen haben.',
  'declined' => 'Das Feld :attribute muss abgelehnt werden.',
  'declined_if' => 'Das Feld :attribute muss abgelehnt werden, wenn :other gleich :value ist.',
  'different' => 'Das Feld :attribute und :other müssen unterschiedlich sein.',
  'digits' => 'Das Feld :attribute muss :digits Ziffern enthalten.',
  'digits_between' => 'Das Feld :attribute muss zwischen :min und :max Ziffern enthalten.',
  'dimensions' => 'Das Feld :attribute hat ungültige Bildabmessungen.',
  'distinct' => 'Das Feld :attribute enthält einen doppelten Wert.',
  'doesnt_end_with' => 'Das Feld :attribute darf nicht mit einer der folgenden Zeichenketten enden: :values.',
  'doesnt_start_with' => 'Das Feld :attribute darf nicht mit einer der folgenden Zeichenketten beginnen: :values.',
  'email' => 'Das Feld :attribute muss eine gültige E-Mail-Adresse enthalten.',
  'ends_with' => 'Das Feld :attribute muss mit einer der folgenden Zeichenketten enden: :values.',
  'enum' => 'Die ausgewählte Option für das Feld :attribute ist ungültig.',
  'exists' => 'Die ausgewählte Option für das Feld :attribute ist ungültig.',
  'file' => 'Das Feld :attribute muss eine Datei sein.',
  'filled' => 'Das Feld :attribute muss einen Wert enthalten.',
  'gt' => [
    'array' => 'Das Feld :attribute muss mehr als :value Elemente enthalten.',
    'file' => 'Das Feld :attribute muss größer als :value Kilobyte sein.',
    'numeric' => 'Das Feld :attribute muss größer als :value sein.',
    'string' => 'Das Feld :attribute muss länger als :value Zeichen sein.',
  ],
  'gte' => [
    'array' => 'Das Feld :attribute muss :value Elemente oder mehr enthalten.',
    'file' => 'Das Feld :attribute muss größer als oder gleich :value Kilobyte sein.',
    'numeric' => 'Das Feld :attribute muss größer als oder gleich :value sein.',
    'string' => 'Das Feld :attribute muss länger als oder gleich :value Zeichen sein.',
  ],
  'image' => 'Das Feld :attribute muss ein Bild sein.',
  'in' => 'Die ausgewählte Option für das Feld :attribute ist ungültig.',
  'in_array' => 'Das Feld :attribute existiert nicht in :other.',
  'integer' => 'Das Feld :attribute muss eine ganze Zahl sein.',
  'ip' => 'Das Feld :attribute muss eine gültige IP-Adresse enthalten.',
  'ipv4' => 'Das Feld :attribute muss eine gültige IPv4-Adresse enthalten.',
  'ipv6' => 'Das Feld :attribute muss eine gültige IPv6-Adresse enthalten.',
  'json' => 'Das Feld :attribute muss eine gültige JSON-Zeichenkette enthalten.',
  'lowercase' => 'Das Feld :attribute muss in Kleinbuchstaben sein.',
  'lt' => [
    'array' => 'Das Feld :attribute muss weniger als :value Elemente enthalten.',
    'file' => 'Das Feld :attribute muss kleiner als :value Kilobyte sein.',
    'numeric' => 'Das Feld :attribute muss kleiner als :value sein.',
    'string' => 'Das Feld :attribute muss kürzer als :value Zeichen sein.',
  ],
  'lte' => [
    'array' => 'Das Feld :attribute darf nicht mehr als :value Elemente enthalten.',
    'file' => 'Das Feld :attribute muss kleiner als oder gleich :value Kilobyte sein.',
    'numeric' => 'Das Feld :attribute muss kleiner als oder gleich :value sein.',
    'string' => 'Das Feld :attribute muss kürzer als oder gleich :value Zeichen sein.',
  ],
  'mac_address' => 'Das Feld :attribute muss eine gültige MAC-Adresse enthalten.',
  'max' => [
    'array' => 'Das Feld :attribute darf nicht mehr als :max Elemente enthalten.',
    'file' => 'Das Feld :attribute darf nicht größer als :max Kilobyte sein.',
    'numeric' => 'Das Feld :attribute darf nicht größer als :max sein.',
    'string' => 'Das Feld :attribute darf nicht länger als :max Zeichen sein.',
  ],
  'max_digits' => 'Das Feld :attribute darf nicht mehr als :max Ziffern enthalten.',
  'mimes' => 'Das Feld :attribute muss eine Datei des Typs :values sein.',
  'mimetypes' => 'Das Feld :attribute muss eine Datei des Typs :values sein.',
  'min' => [
    'array' => 'Das Feld :attribute muss mindestens :min Elemente enthalten.',
    'file' => 'Das Feld :attribute muss mindestens :min Kilobyte groß sein.',
    'numeric' => 'Das Feld :attribute muss mindestens :min sein.',
    'string' => 'Das Feld :attribute muss mindestens :min Zeichen lang sein.',
  ],
  'min_digits' => 'Das Feld :attribute muss mindestens :min Ziffern enthalten.',
  'missing' => 'Das Feld :attribute darf nicht vorhanden sein.',
  'missing_if' => 'Das Feld :attribute darf nicht vorhanden sein, wenn :other gleich :value ist.',
  'missing_unless' => 'Das Feld :attribute darf nicht vorhanden sein, es sei denn, :other ist gleich :value.',
  'missing_with' => 'Das Feld :attribute darf nicht vorhanden sein, wenn :values vorhanden ist.',
  'missing_with_all' => 'Das Feld :attribute darf nicht vorhanden sein, wenn :values vorhanden sind.',
  'multiple_of' => 'Das Feld :attribute muss ein Vielfaches von :value sein.',
  'not_in' => 'Die ausgewählte Option für das Feld :attribute ist ungültig.',
  'not_regex' => 'Das Format des Feldes :attribute ist ungültig.',
  'numeric' => 'Das Feld :attribute muss eine Zahl sein.',
  'password' => [
    'letters' => 'Das Feld :attribute muss mindestens einen Buchstaben enthalten.',
    'mixed' => 'Das Feld :attribute muss mindestens einen Großbuchstaben und einen Kleinbuchstaben enthalten.',
    'numbers' => 'Das Feld :attribute muss mindestens eine Zahl enthalten.',
    'symbols' => 'Das Feld :attribute muss mindestens ein Symbol enthalten.',
    'uncompromised' => 'Das angegebene Feld :attribute ist in einem Datenleck aufgetaucht. Bitte wählen Sie ein anderes :attribute.',
  ],
  'present' => 'Das Feld :attribute muss vorhanden sein.',
  'prohibited' => 'Das Feld :attribute ist nicht erlaubt.',
  'prohibited_if' => 'Das Feld :attribute ist nicht erlaubt, wenn :other gleich :value ist.',
  'prohibited_unless' => 'Das Feld :attribute ist nicht erlaubt, es sei denn, :other ist in :values enthalten.',
  'prohibits' => 'Das Feld :attribute verbietet, dass :other vorhanden ist.',
  'regex' => 'Das Format des Feldes :attribute ist ungültig.',
  'required' => 'Das Feld :attribute ist erforderlich.',
  'required_array_keys' => 'Das Feld :attribute muss Einträge für die folgenden Schlüssel enthalten: :values.',
  'required_if' => 'Das Feld :attribute ist erforderlich, wenn :other gleich :value ist.',
  'required_if_accepted' => 'Das Feld :attribute ist erforderlich, wenn :other akzeptiert wird.',
  'required_unless' => 'Das Feld :attribute ist erforderlich, es sei denn, :other ist in :values enthalten.',
  'required_with' => 'Das Feld :attribute ist erforderlich, wenn :values vorhanden ist.',
  'required_with_all' => 'Das Feld :attribute ist erforderlich, wenn alle :values vorhanden sind.',
  'required_without' => 'Das Feld :attribute ist erforderlich, wenn :values nicht vorhanden ist.',
  'required_without_all' => 'Das Feld :attribute ist erforderlich, wenn keines der :values vorhanden ist.',
  'same' => 'Das Feld :attribute und :other müssen übereinstimmen.',
  'size' => [
    'array' => 'Das Feld :attribute muss :size Elemente enthalten.',
    'file' => 'Das Feld :attribute muss :size Kilobyte groß sein.',
    'numeric' => 'Das Feld :attribute muss :size sein.',
    'string' => 'Das Feld :attribute muss :size Zeichen lang sein.',
  ],
  'starts_with' => 'Das Feld :attribute muss mit einem der folgenden Werte beginnen: :values.',
  'string' => 'Das Feld :attribute muss eine Zeichenkette sein.',
  'timezone' => 'Das Feld :attribute muss eine gültige Zeitzone enthalten.',
  'unique' => 'Das Feld :attribute wurde bereits verwendet.',
  'uploaded' => 'Das Hochladen des Feldes :attribute ist fehlgeschlagen.',
  'uppercase' => 'Das Feld :attribute muss in Großbuchstaben sein.',
  'url' => 'Das Feld :attribute muss eine gültige URL enthalten.',
  'ulid' => 'Das Feld :attribute muss einen gültigen ULID enthalten.',
  'uuid' => 'Das Feld :attribute muss eine gültige UUID enthalten.',

  /*
  |--------------------------------------------------------------------------
  | Custom Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | Here you may specify custom validation messages for attributes using the
  | convention "attribute.rule" to name the lines. This makes it quick to
  | specify a specific custom language line for a given attribute rule.
  |
   */

  'custom' => [
    'attribute-name' => [
      'rule-name' => 'custom-message',
    ],
  ],

  /*
  |--------------------------------------------------------------------------
  | Custom Validation Attributes
  |--------------------------------------------------------------------------
  |
  | The following language lines are used to swap our attribute placeholder
  | with something more reader friendly such as "E-Mail Address" instead
  | of "email". This simply helps us make our message more expressive.
  |
   */

  'attributes' => [],

];
