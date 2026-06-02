<?php

namespace App\Http\Controllers;

use App\Models\CallRecorde;
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
        return Inertia::render('CallRecords/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'CustomerName' => 'required|string|max:255',
            'CustomerPhoneNumber' => 'required|string|max:20',
            'CustomerAddress' => 'nullable|string',
            'CustomerEmail' => 'nullable|email',
            'reason_id' => 'nullable|integer',
            'product' => 'nullable|string|max:255',
            'CustomerCompany' => 'nullable|string|max:255',
            'status' => 'required|in:pending,complete,close,fail',
        ]);

        $user = Auth::user();

        CallRecorde::create([
            'CustomerName' => $request->CustomerName,
            'CustomerPhoneNumber' => $request->CustomerPhoneNumber,
            'CustomerAddress' => $request->CustomerAddress,
            'CustomerEmail' => $request->CustomerEmail,
            'reason_id' => $request->reason_id,
            'product' => $request->product,
            'CustomerCompany' => $request->CustomerCompany,
            'status' => $request->status,

            'CompanyId' => $user->companyid,
            'CreatedBy' => $user->id,
        ]);

        return redirect()
            ->route('call-records.index')
            ->with('success', 'Call record created successfully');
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
