<?php
namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistrictController extends Controller
{
    public function index()
    {
        $districts = District::orderBy('districtName')->get();

        return Inertia::render('companysettings,', [
            'districts' => $districts,
            'activeTab' => 'districts',
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'districtName' => 'required|string|max:255|unique:districts,districtName',
        ], [
            'districtName.required' => 'District name is required.',
            'districtName.unique'   => 'This district already exists.',
        ]);

        District::create(['districtName' => $request->districtName]);

        return back()->with('success', 'District added successfully.');
    }

    public function update(Request $request, District $district)
    {
        $request->validate([
            'districtName' => 'required|string|max:255|unique:districts,districtName,' . $district->id,
        ], [
            'districtName.required' => 'District name is required.',
            'districtName.unique'   => 'This district already exists.',
        ]);

        $district->update(['districtName' => $request->districtName]);

        return back()->with('success', 'District updated successfully.');
    }

    public function destroy(District $district)
    {
        $district->delete($district->id);

        return back()->with('success', 'District deleted successfully.');
    }
}
