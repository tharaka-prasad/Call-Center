<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Return users list for the settings page (via the SettingsController or direct).
     * superadmin  → all users
     * companyadmin → only users in their company
     */


    /**
     * Store a new user.
     */
    public function store(Request $request)
    {
        $authUser = Auth::user();

        $request->validate([
            'firstName' => 'required|string|max:100',
            'lastName'  => 'required|string|max:100',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|string|min:6',
            'role'      => ['required', Rule::in(['admin', 'argent', 'superadmin'])],
            'status'    => ['required', Rule::in(['active', 'inactive'])],
            'companyid' => 'required|integer|exists:campanies,id',
        ]);

        // companyadmin can only create users for their own company
        $companyid = $authUser->role === 'superadmin'
            ? ($request->companyid ?? $authUser->companyid)
            : $authUser->companyid;

        User::create([
            'firstName' => $request->firstName,
            'lastName'  => $request->lastName,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'role'      => $request->role,
            'status'    => $request->status,
            'companyid' => $companyid,
        ]);

        return back()->with('success', 'User created successfully.');
    }

    /**
     * Update an existing user.
     */
    public function update(Request $request, string $id)
    {
        $authUser = Auth::user();
        $user     = User::findOrFail($id);

        // companyadmin can only edit users in their own company
        if ($authUser->role === 'admin' && $user->companyid !== $authUser->companyid) {
            abort(403);
        }

        $request->validate([
            'firstName' => 'required|string|max:100',
            'lastName'  => 'required|string|max:100',
            'email'     => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
            'role'      => ['required', Rule::in(['companyadmin', 'argent', 'superadmin'])],
            'status'    => ['required', Rule::in(['active', 'inactive'])],
            'password'  => 'nullable|string|min:6',
            'companyid' => 'nullable|integer|exists:campanies,id',
        ]);

        $updateData = [
            'firstName' => $request->firstName,
            'lastName'  => $request->lastName,
            'email'     => $request->email,
            'role'      => $request->role,
            'status'    => $request->status,
            'companyid' => $request->companyid,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);

        return back()->with('success', 'User updated successfully.');
    }

    /**
     * Delete a user.
     */
    public function destroy(string $id)
    {
        $authUser = Auth::user();
        $user     = User::findOrFail($id);

        // Can't delete yourself
        if ($user->id === $authUser->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        // companyadmin can only delete users in their own company
        if ($authUser->role === 'companyadmin' && $user->companyid !== $authUser->companyid) {
            abort(403);
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }
}
