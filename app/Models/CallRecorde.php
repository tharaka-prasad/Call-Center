<?php

namespace App\Models;

use Faker\Provider\Company;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CallRecorde extends Model
{
    use HasFactory;
    protected $fillable = [
        'CustomerName',
        'CustomerPhoneNumber',
        'CustomerAddress',
        'CustomerEmail',
        'CustomerCompany',
        'product',
        'reason',
        'status',
        'fail_reason',
        'callback_days',
        'CreatedBy',
        'callback_date',
        'callback_note',
        'callback_time',
        'CompanyId',
        'is_callback_done',
        'callback_description',
    ];

    /*
    |-----------------------------------
    | Casts
    |-----------------------------------
    */
    protected $casts = [
        'callback_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /*
    |-----------------------------------
    | Relationships
    |-----------------------------------
    */

    // Creator (User)
    public function creator()
    {
        return $this->belongsTo(User::class, 'CreatedBy');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'CompanyId');
    }

    /*
    |-----------------------------------
    | Helpers
    |-----------------------------------
    */

    // Full customer display name
    public function getCustomerInfoAttribute()
    {
        return $this->CustomerName . ' - ' . $this->CustomerPhoneNumber;
    }

    // Check if callback is due
    public function getIsDueAttribute()
    {
        return $this->callback_date && now()->greaterThanOrEqualTo($this->callback_date);
    }
}
