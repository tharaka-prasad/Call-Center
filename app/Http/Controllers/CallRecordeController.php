<?php

namespace App\Http\Controllers;

use App\Models\CallRecorde;
use App\Models\District;
use App\Models\Product;
use App\Models\Reason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CallRecordeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $calls = CallRecorde::where('CompanyId', $user->companyid)
            ->latest()
            ->get();

        return Inertia::render('CallRecords/Index', [
            'calls' => $calls
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
   public function create()
{
    $reasons = Reason::all();

    $products = Product::with('models')->get();
    $districts = District::all(); // ✅ NEW


    return Inertia::render('CallRecords/Create', [
        'reasons' => $reasons,
        'products' => $products,
        'districts' => $districts,
    ]);
}

    /**
     * Store new call record.
     */
    public function store(Request $request)
    {
        $request->validate([
            'CustomerName'        => 'required|string|max:255',
            'CustomerPhoneNumber' => 'required|string|max:20',
            'CustomerAddress'     => 'nullable|string',
            'CustomerEmail'       => 'nullable|email',
            'CustomerCompany'     => 'nullable|string|max:255',
            'district'            => 'nullable|integer',


            'reason'          => 'nullable|integer',

            'product'         => 'nullable|integer',
            'productModel'   => 'nullable|integer',

            'productPrice'      => 'nullable|numeric',
            'discountPrice'     => 'nullable|numeric',

            'callback_date'      => 'nullable|date',

            'status'             => 'required|in:pending,complete,close,fail',
        ]);

        $user = Auth::user();

        CallRecorde::create([
            'CustomerName'        => $request->CustomerName,
            'CustomerPhoneNumber' => $request->CustomerPhoneNumber,
            'CustomerAddress'     => $request->CustomerAddress,
            'CustomerEmail'       => $request->CustomerEmail,
            'CustomerCompany'     => $request->CustomerCompany,
            'district'            => $request->district,

            'reason'          => $request->reason,

            'product'         => $request->product,
            'productModel'   => $request->productModel,

            'productPrice'      => $request->productPrice,
            'discountPrice'     => $request->discountPrice,

            'callback_date'      => $request->callback_date,

            'status'             => $request->status,

            'CompanyId'          => $user->companyid,
            'CreatedBy'          => $user->id,
        ]);

        return redirect()
            ->route('call-records.index')
            ->with('success', 'Call Record Created Successfully');
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
