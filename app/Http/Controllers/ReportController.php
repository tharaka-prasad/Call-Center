<?php

namespace App\Http\Controllers;

use App\Models\CallRecorde;
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

    $query= CallRecorde::with([
            'product',
            'productModel',
            'reason',
            'creator',
        ])
    ->where('CompanyId', $user->companyid);

    // Super Admin & Company Admin
    if (!in_array($user->role, ['superadmin', 'companyadmin'])) {
        $query->where('CreatedBy', $user->id);
    }

    // Date Filter
    if ($request->filled('from_date') && $request->filled('to_date')) {
        $query->whereBetween('created_at', [
            $request->from_date . ' 00:00:00',
            $request->to_date . ' 23:59:59'
        ]);
    }

    // District Filter
    if ($request->filled('district')) {
        $query->where('district', $request->district);
    }

    // Product Filter
    if ($request->filled('product')) {
        $query->where('product', $request->product);
    }

    // Model Filter
    if ($request->filled('model')) {
        $query->where('productModel', $request->model);
    }

    // Reason Filter
    if ($request->filled('reason')) {
        $query->where('reason', $request->reason);
    }

    $calls = $query->latest()->get();

    return Inertia::render('CallReports/Index', [
        'calls' => $calls,
        'filters' => $request->all(),
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
