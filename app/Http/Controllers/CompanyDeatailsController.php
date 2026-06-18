<?php
namespace App\Http\Controllers;

use App\Models\Campany;
use App\Models\District;
use App\Models\Product;
use App\Models\Reason;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompanyDeatailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authUser = Auth::user();

        // Master data
        $districts = District::orderBy('districtName', 'asc')->get();
        $reasons   = Reason::orderBy('reason', 'asc')->get();
        $companies = Campany::orderBy('companyName', 'asc')->get();

        $products = Product::with('models')
            ->orderBy('productName', 'asc')
            ->get();

        // USERS
        $users = User::query();

        if (in_array($authUser->role, ['admin', 'argent'])) {

            $users->where(function ($q) use ($authUser) {
                $q->where('companyid', $authUser->companyid)
                    ->orWhere('id', $authUser->id); // always include self
            });
        }

        // superadmin → no filter

        $users = $users->orderBy('firstName', 'asc')
            ->get([
                'id',
                'firstName',
                'lastName',
                'email',
                'role',
                'status',
                'companyid',
            ]);
        return Inertia::render('Companysettings/Index', [
            'districts' => $districts,
            'reasons'   => $reasons,
            'companies' => $companies,
            'products'  => $products,
            'users'     => $users,
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
