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

        $calls = CallRecorde::with([
            'product',
            'productModel',
            'reason',
            'creator',
        ])
            ->where('companyId', $user->companyid)
            ->latest()
            ->get();

        return Inertia::render('CallRecords/Index', [
            'calls' => $calls,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $reasons = Reason::all();

        $products  = Product::with('models')->get();
        $districts = District::all(); // ✅ NEW

        return Inertia::render('CallRecords/Create', [
            'reasons'   => $reasons,
            'products'  => $products,
            'districts' => $districts,
        ]);
    }

    /**
     * Store new call record.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customerName'        => 'required|string|max:255',
            'customerPhoneNumber' => 'required|string|max:20',
            'customerAddress'     => 'nullable|string',
            'customerEmail'       => 'nullable|email',
            'customerCompany'     => 'nullable|string|max:255',
            'district'            => 'nullable|integer',

            'reason'              => 'nullable|integer',

            'product'             => 'nullable|integer',
            'productModel'        => 'nullable|integer',

            'productPrice'        => 'nullable|numeric',
            'discountPrice'       => 'nullable|numeric',

            'callback_date'       => 'nullable|date',

            'status'              => 'required|in:pending,complete,close,fail',
        ]);

        $user = Auth::user();

        CallRecorde::create([
            'customerName'        => $request->customerName,
            'customerPhoneNumber' => $request->customerPhoneNumber,
            'customerAddress'     => $request->customerAddress,
            'customerEmail'       => $request->customerEmail,
            'customerCompany'     => $request->customerCompany,
            'district'            => $request->district,

            'reason'              => $request->reason,

            'product'             => $request->product,
            'productModel'        => $request->productModel,

            'productPrice'        => $request->productPrice,
            'discountPrice'       => $request->discountPrice,

            'callback_date'       => $request->callback_date,

            'status'              => $request->status,

            'companyId'           => $user->companyid,
            'createdBy'           => $user->id,
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
        $user = Auth::user();

        $call = CallRecorde::where('id', $id)
            ->where('companyId', $user->companyid)
            ->with(['district', 'reason', 'product', 'productModel', 'creator'])
            ->firstOrFail();

        return Inertia::render('CallRecords/Show', [
            'call' => $call,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = Auth::user();

        $call = CallRecorde::where('id', $id)
            ->where('companyId', $user->companyid)
            ->firstOrFail();

        $products  = Product::with('models')->get();
        $reasons   = Reason::all();
        $districts = District::all();

        return Inertia::render('CallRecords/Edit', [
            'call'      => $call,
            'products'  => $products,
            'reasons'   => $reasons,
            'districts' => $districts,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        $call = CallRecorde::where('id', $id)
            ->where('companyId', $user->companyid)
            ->firstOrFail();

        $request->validate([
            'customerName'         => 'required|string|max:255',
            'customerPhoneNumber'  => 'required|string|max:20',
            'customerAddress'      => 'nullable|string',
            'customerEmail'        => 'nullable|email',
            'customerCompany'      => 'nullable|string|max:255',
            'district'             => 'nullable|integer',
            'reason'               => 'nullable|integer',
            'product'              => 'nullable|integer',
            'productModel'         => 'nullable|integer',
            'productPrice'         => 'nullable|numeric',
            'discountPrice'        => 'nullable|numeric',
            'callback_date'        => 'nullable|date',
            'status'               => 'required|in:pending,complete,close,fail',
            'fail_reason'          => 'nullable|required_if:status,fail|string',
            'closeDate'            => 'nullable|required_if:status,close|date',
            'closeNote'            => 'nullable|string',
            'is_callback_done'     => 'nullable|in:yes,no',
            'callback_description' => 'nullable|string',
        ]);

        $call->update([
            'customerName'         => $request->customerName,
            'customerPhoneNumber'  => $request->customerPhoneNumber,
            'customerAddress'      => $request->customerAddress,
            'customerEmail'        => $request->customerEmail,
            'customerCompany'      => $request->customerCompany,
            'district'             => $request->district,
            'reason'               => $request->reason,
            'product'              => $request->product,
            'productModel'         => $request->productModel,
            'productPrice'         => $request->productPrice,
            'discountPrice'        => $request->discountPrice,
            'callback_date'        => $request->callback_date,
            'status'               => $request->status,

            'fail_reason'          => $request->status === 'fail'
                ? $request->fail_reason
                : null,

            'closeDate'            => $request->status === 'close'
                ? $request->closeDate
                : null,
            'closeNote'            => $request->status === 'close'
                ? $request->closeNote
                : null,

            'is_callback_done'     => $request->is_callback_done,
            'callback_description' => $request->is_callback_done === 'yes'
                ? $request->callback_description
                : null,
        ]);

        return redirect()
            ->route('call-records.index')
            ->with('success', 'Call Record Updated Successfully');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
