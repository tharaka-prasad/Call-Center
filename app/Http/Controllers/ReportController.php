<?php

namespace App\Http\Controllers;

use App\Models\CallRecorde;
use App\Models\District;
use App\Models\Product;
use App\Models\ProductModel;
use App\Models\Reason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = CallRecorde::with([
            'product',
            'productModel',
            'reason',
            'creator',
            'district'
        ])->where('companyId', $user->companyid);

        if (!in_array($user->role, ['superadmin', 'companyadmin'])) {
            $query->where('createdBy', $user->id);
        }

        if ($request->filled('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->filled('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        if ($request->filled('district')) {
            $query->where('district', $request->district);
        }

        if ($request->filled('product')) {
            $query->where('product', $request->product);
        }

        if ($request->filled('model')) {
            $query->where('productModel', $request->model);
        }

        if ($request->filled('reason')) {
            $query->where('reason', $request->reason);
        }

        $calls = $query->latest()->get();

        return Inertia::render('CallReports/Index', [
            'calls' => $calls,

            'filters' => [
                'from_date' => $request->from_date,
                'to_date'   => $request->to_date,
                'district'  => $request->district,
                'product'   => $request->product,
                'model'     => $request->model,
                'reason'    => $request->reason,
            ],

            'districts' => District::all(),
            'reasons'   => Reason::all(),
            'products'  => Product::all(),
            'models'    => ProductModel::all(),
        ]);
    }
}
