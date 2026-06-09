<?php
namespace App\Http\Controllers;

use App\Models\Campany;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'companyName' => 'required|string|max:255|unique:campanies,companyName',
        ], [
            'companyName.required' => 'Company name is required.',
            'companyName.unique'   => 'This company already exists.',
        ]);

        Campany::create(['companyName' => $request->companyName]);

        return back()->with('success', 'Company Name added successfully.');
    }

    public function update(Request $request, Campany $companyName)
    {
        $request->validate([
            'companyName' => 'required|string|max:255|unique:campanies,companyName,' . $companyName->id,
        ], [
            'companyName.required' => 'Company name is required.',
            'companyName.unique'   => 'This company already exists.',
        ]);

        $companyName->update(['companyName' => $request->companyName]);

        return back()->with('success', 'Company Name updated successfully.');
    }

    public function destroy(Campany $companyName)
    {
        $companyName->delete($companyName->id);

        return back()->with('success', 'Company Name deleted successfully.');
    }

}
