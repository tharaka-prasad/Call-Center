<?php
namespace App\Http\Controllers;

use App\Models\Campany;
use App\Models\District;
use App\Models\Product;
use App\Models\Reason;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyDeatailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $districts = District::orderBy('districtName')->get();
        $reasons   = Reason::orderBy('reason')->get();
        $companies = Campany::orderBy('companyName')->get();

        $products = Product::with('models')
            ->orderBy('productName')
            ->get();

        return Inertia::render('Companysettings/Index', [
            'districts' => $districts,
            'reasons'   => $reasons,
            'companies' => $companies,
            'products'  => $products,
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
