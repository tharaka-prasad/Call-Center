<?php
namespace App\Http\Controllers;

use App\Models\Reason;
use Illuminate\Http\Request;

class ReasonController extends Controller
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
            'reason' => 'required|string|max:255|unique:reasons,reason',
        ], [
            'reason.required' => 'Reason name is required.',
            'reason.unique'   => 'This Reason already exists.',
        ]);

        Reason::create(['reason' => $request->reason]);

        return back()->with('success', 'Reason added successfully.');
    }

    public function update(Request $request, Reason $reason)
    {
        $request->validate([
            'reason' => 'required|string|max:255|unique:reasons,reason,' . $reason->id,
        ], [
            'reason.required' => 'Reason name is required.',
            'reason.unique'   => 'This reason already exists.',
        ]);

        $reason->update(['reason' => $request->reason]);

        return back()->with('success', 'Reason updated successfully.');
    }

    public function destroy(Reason $reason)
    {
        $reason->delete($reason->id);

        return back()->with('success', 'Reason deleted successfully.');
    }

}
