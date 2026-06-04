<?php
namespace App\Models;

use App\Models\Campany;
use App\Models\District;
use App\Models\Product;
use App\Models\ProductModel;
use App\Models\Reason;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CallRecorde extends Model
{
    use HasFactory;

    protected $fillable = [
        'customerName',
        'customerPhoneNumber',
        'customerAddress',
        'customerEmail',
        'customerCompany',
        'product',
        'productModel',
        'productPrice',
        'discountPrice',
        'district',
        'reason',
        'status',
        'fail_reason',
        'callback_days',
        'createdBy',
        'callback_date',
        'callback_note',
        'callback_time',
        'companyId',
        'is_callback_done',
        'callback_description',
    ];

    protected $casts = [
        'callback_date' => 'datetime',
        'created_at'    => 'datetime',
        'updated_at'    => 'datetime',
    ];

    // COMPANY
    public function company()
    {
        return $this->belongsTo(Campany::class, 'companyId');
    }

    // USER
    public function creator()
    {
        return $this->belongsTo(User::class, 'createdBy');
    }

    // ✅ PRODUCT (FIXED NAME)
    public function product()
    {
        return $this->belongsTo(Product::class, 'product');
    }

    // PRODUCT MODEL
    public function productModel()
    {
        return $this->belongsTo(ProductModel::class, 'productModel');
    }

    // REASON
    public function reason()
    {
        return $this->belongsTo(Reason::class, 'reason');
    }

    // DISTRICT
    public function district()
    {
        return $this->belongsTo(District::class, 'district');
    }
}
