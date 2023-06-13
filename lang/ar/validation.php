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

  'accepted' => 'يجب قبول :attribute.',
  'accepted_if' => 'يجب قبول :attribute عندما يكون :other هو :value.',
  'active_url' => ':attribute ليس عنوان URL صالحًا.',
  'after' => ':attribute يجب أن يكون تاريخًا بعد :date.',
  'after_or_equal' => ':attribute يجب أن يكون تاريخًا بعد أو يساوي :date.',
  'alpha' => ':attribute يجب أن يحتوي على أحرف فقط.',
  'alpha_dash' => ':attribute يجب أن يحتوي على أحرف وأرقام وشرطات وشرطات سفلية فقط.',
  'alpha_num' => ':attribute يجب أن يحتوي على أحرف وأرقام فقط.',
  'array' => ':attribute يجب أن يكون مصفوفة.',
  'ascii' => ':attribute يجب أن يحتوي على أحرف أبجدية وأرقام أحادية البايت ورموز فقط.',
  'before' => ':attribute يجب أن يكون تاريخًا قبل :date.',
  'before_or_equal' => ':attribute يجب أن يكون تاريخًا قبل أو يساوي :date.',
  'between' => [
    'array' => ':attribute يجب أن يحتوي على بين :min و :max عنصرًا.',
    'file' => 'يجب أن يكون حجم :attribute بين :min و :max كيلوبايت.',
    'numeric' => 'يجب أن يكون :attribute بين :min و :max.',
    'string' => 'يجب أن يكون طول :attribute بين :min و :max حرفًا.',
  ],
  'boolean' => 'يجب أن يكون حقل :attribute صحيحًا أو خطأ.',
  'confirmed' => 'تأكيد :attribute غير متطابق.',
  'current_password' => 'كلمة المرور غير صحيحة.',
  'date' => ':attribute ليس تاريخًا صالحًا.',
  'date_equals' => ':attribute يجب أن يكون تاريخًا يساوي :date.',
  'date_format' => ':attribute لا يتطابق مع الشكل :format.',
  'decimal' => ':attribute يجب أن يحتوي على :decimal أماكن عشرية.',
  'declined' => 'يجب رفض :attribute.',
  'declined_if' => 'يجب رفض :attribute عندما يكون :other هو :value.',
  'different' => ':attribute و :other يجب أن يكونا مختلفين.',
  'digits' => ':attribute يجب أن يحتوي على :digits أرقام.',
  'digits_between' => ':attribute يجب أن يكون بين :min و :max أرقام.',
  'dimensions' => ':attribute يحتوي على أبعاد صورة غير صالحة.',
  'distinct' => 'حقل :attribute يحتوي على قيمة مكررة.',
  'doesnt_end_with' => ':attribute لا يمكن أن ينتهي بأحد القيم التالية: :values.',
  'doesnt_start_with' => ':attribute لا يمكن أن يبدأ بأحد القيم التالية: :values.',
  'email' => ':attribute يجب أن يكون عنوان بريد إلكتروني صالحًا.',
  'ends_with' => ':attribute يجب أن ينتهي بأحد القيم التالية: :values.',
  'enum' => 'القيمة المختارة :attribute غير صالحة.',
  'exists' => 'القيمة المحددة :attribute غير صالحة.',
  'file' => ':attribute يجب أن يكون ملفًا.',
  'filled' => 'يجب أن يحتوي حقل :attribute على قيمة.',
  'gt' => [
    'array' => ':attribute يجب أن يحتوي على أكثر من :value عنصر.',
    'file' => 'يجب أن يكون حجم :attribute أكبر من :value كيلوبايت.',
    'numeric' => 'يجب أن يكون :attribute أكبر من :value.',
    'string' => 'يجب أن يكون طول :attribute أكبر من :value حرفًا.',
  ],
  'gte' => [
    'array' => ':attribute يجب أن يحتوي على :value عنصر أو أكثر.',
    'file' => 'يجب أن يكون حجم :attribute أكبر من أو يساوي :value كيلوبايت.',
    'numeric' => 'يجب أن يكون :attribute أكبر من أو يساوي :value.',
    'string' => 'يجب أن يكون طول :attribute أكبر من أو يساوي :value حرفًا.',
  ],
  'image' => ':attribute يجب أن يكون صورة.',
  'in' => ':attribute المحدد غير صالح.',
  'in_array' => 'حقل :attribute لا يوجد في :other.',
  'integer' => ':attribute يجب أن يكون عددًا صحيحًا.',
  'ip' => ':attribute يجب أن يكون عنوان IP صالحًا.',
  'ipv4' => ':attribute يجب أن يكون عنوان IPv4 صالحًا.',
  'ipv6' => ':attribute يجب أن يكون عنوان IPv6 صالحًا.',
  'json' => ':attribute يجب أن يكون سلسلة JSON صالحة.',
  'lowercase' => ':attribute يجب أن تكون جميع الأحرف صغيرة.',
  'lt' => [
    'array' => ':attribute يجب أن يحتوي على أقل من :value عنصر.',
    'file' => 'يجب أن يكون حجم :attribute أقل من :value كيلوبايت.',
    'numeric' => 'يجب أن يكون :attribute أقل من :value.',
    'string' => 'يجب أن يكون طول :attribute أقل من :value حرفًا.',
  ],
  'lte' => [
    'array' => ':attribute لا يجب أن يحتوي على أكثر من :value عنصر.',
    'file' => 'يجب أن يكون حجم :attribute أقل من أو يساوي :value كيلوبايت.',
    'numeric' => 'يجب أن يكون :attribute أقل من أو يساوي :value.',
    'string' => 'يجب أن يكون طول :attribute أقل من أو يساوي :value حرفًا.',
  ],
  'mac_address' => ':attribute يجب أن يكون عنوان MAC صالح.',
  'max' => [
    'array' => ':attribute لا يجب أن يحتوي على أكثر من :max عنصر.',
    'file' => 'يجب أن لا يكون حجم :attribute أكبر من :max كيلوبايت.',
    'numeric' => 'يجب أن لا يكون :attribute أكبر من :max.',
    'string' => 'يجب أن لا يكون طول :attribute أكبر من :max حرفًا.',
  ],
  'max_digits' => ':attribute يجب ألا يحتوي على أكثر من :max أرقام.',
  'mimes' => ':attribute يجب أن يكون ملفًا من النوع: :values.',
  'mimetypes' => ':attribute يجب أن يكون ملفًا من النوع: :values.',
  'min' => [
    'array' => ':attribute يجب أن يحتوي على الأقل على :min عنصر.',
    'file' => 'يجب أن يكون حجم :attribute على الأقل :min كيلوبايت.',
    'numeric' => 'يجب أن يكون :attribute على الأقل :min.',
    'string' => 'يجب أن يكون طول :attribute على الأقل :min حرفًا.',
  ],
  'min_digits' => ':attribute يجب أن يحتوي على الأقل :min أرقام.',
  'missing' => 'يجب أن يفتقد حقل :attribute.',
  'missing_if' => 'يجب أن يفتقد حقل :attribute عندما :other هو :value.',
  'missing_unless' => 'يجب أن يفتقد حقل :attribute ما لم يكن :other هو :value.',
  'missing_with' => 'يجب أن يفتقد حقل :attribute عندما تكون :values موجودة.',
  'missing_with_all' => 'يجب أن يفتقد حقل :attribute عندما تكون :values موجودة.',
  'multiple_of' => ':attribute يجب أن يكون مضاعفًا لـ :value.',
  'not_in' => ':attribute المحدد غير صالح.',
  'not_regex' => 'صيغة :attribute غير صالحة.',
  'numeric' => ':attribute يجب أن يكون رقمًا.',
  'password' => [
    'letters' => 'يجب أن يحتوي :attribute على حرف واحد على الأقل.',
    'mixed' => 'يجب أن يحتوي :attribute على حرف كبير وحرف صغير على الأقل.',
    'numbers' => 'يجب أن يحتوي :attribute على رقم واحد على الأقل.',
    'symbols' => 'يجب أن يحتوي :attribute على رمز واحد على الأقل.',
    'uncompromised' => 'تم ظهور :attribute المعطى في تسرب بيانات. يرجى اختيار :attribute مختلف.',
  ],
  'present' => 'يجب أن يكون حقل :attribute حاضرًا.',
  'prohibited' => 'الحقل :attribute محظور.',
  'prohibited_if' => 'الحقل :attribute محظور عندما :other هو :value.',
  'prohibited_unless' => 'الحقل :attribute محظور ما لم يكن :other في :values.',
  'prohibits' => 'الحقل :attribute يمنع وجود :other.',
  'regex' => 'صيغة :attribute غير صالحة.',
  'required' => 'حقل :attribute مطلوب.',
  'required_array_keys' => 'يجب أن يحتوي حقل :attribute على إدخالات لـ: :values.',
  'required_if' => 'حقل :attribute مطلوب عندما :other هو :value.',
  'required_if_accepted' => 'حقل :attribute مطلوب عندما يتم قبول :other.',
  'required_unless' => 'حقل :attribute مطلوب ما لم يكن :other في :values.',
  'required_with' => 'حقل :attribute مطلوب عندما تكون :values موجودة.',
  'required_with_all' => 'حقل :attribute مطلوب عندما تكون :values موجودة.',
  'required_without' => 'حقل :attribute مطلوب عندما لا يكون :values موجودًا.',
  'required_without_all' => 'حقل :attribute مطلوب عندما لا يوجد أيًا من :values موجودًا.',
  'same' => ':attribute و :other يجب أن يتطابقا.',
  'size' => [
    'array' => 'يجب أن يحتوي :attribute على :size عنصرًا.',
    'file' => 'يجب أن يكون حجم :attribute :size كيلوبايت.',
    'numeric' => 'يجب أن يكون :attribute :size.',
    'string' => 'يجب أن يكون طول :attribute :size حرفًا.',
  ],
  'starts_with' => ':attribute يجب أن يبدأ بأحد القيم التالية: :values.',
  'string' => ':attribute يجب أن يكون سلسلة نصية.',
  'timezone' => ':attribute يجب أن يكون منطقة زمنية صالحة.',
  'unique' => ':attribute تم استخدامه بالفعل.',
  'uploaded' => 'فشل في تحميل :attribute.',
  'uppercase' => ':attribute يجب أن تكون كل أحرفها بالحروف الكبيرة.',
  'url' => ':attribute يجب أن يكون عنوان URL صالحًا.',
  'ulid' => ':attribute يجب أن يكون ULID صالحًا.',
  'uuid' => ':attribute يجب أن يكون UUID صالحًا.',

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
