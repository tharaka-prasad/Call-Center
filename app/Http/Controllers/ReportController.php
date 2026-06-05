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
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = CallRecorde::query()
            ->with([
                'product',
                'productModel',
                'reason',
                'creator',
                'district',
            ])
            ->where('companyId', $user->companyid);

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
            'calls'     => $calls,

            'filters'   => $request->only([
                'from_date',
                'to_date',
                'district',
                'product',
                'model',
                'reason',
            ]),

            'districts' => District::all(),
            'reasons'   => Reason::all(),
            'products'  => Product::all(),
            'models'    => ProductModel::all(), // IMPORTANT

        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
