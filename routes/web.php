<?php

use App\Http\Controllers\CallRecordeController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyDeatailsController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReasonController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/call-records', [CallRecordeController::class, 'index'])
        ->name('call-records.index');

    Route::get('/call-records/create', [CallRecordeController::class, 'create'])
        ->name('call-records.create');

    Route::post('/call-records-store', [CallRecordeController::class, 'store'])
        ->name('call-records.store');

    Route::get('/call-records/{id}', [CallRecordeController::class, 'show'])
        ->name('call-records.show');

    Route::get('/call-records/{id}/edit', [CallRecordeController::class, 'edit'])
        ->name('call-records.edit');

    Route::put('/call-records/{id}', [CallRecordeController::class, 'update'])
        ->name('call-records.update');

    Route::delete('/call-records/{id}', [CallRecordeController::class, 'destroy'])
        ->name('call-records.destroy');

    Route::get('/report', [ReportController::class, 'index'])
        ->name('report.index');

    Route::get('/company-settings', [CompanyDeatailsController::class, 'index'])
        ->name('company.index');

    Route::post('/settings/districts', [DistrictController::class, 'store'])->name('districts.store');
    Route::put('/settings/districts/{district}', [DistrictController::class, 'update'])->name('districts.update');
    Route::delete('/settings/districts/{district}', [DistrictController::class, 'destroy'])->name('districts.destroy');

    Route::post('/settings/reasons', [ReasonController::class, 'store'])->name('reasons.store');
    Route::put('/settings/reasons/{reason}', [ReasonController::class, 'update'])->name('reasons.update');
    Route::delete('/settings/reasons/{reason}', [ReasonController::class, 'destroy'])->name('reasons.destroy');

    Route::post('/settings/company', [CompanyController::class, 'store'])->name('company.store');
    Route::put('/settings/company/{company}', [CompanyController::class, 'update'])->name('company.update');
    Route::delete('/settings/company/{company}', [CompanyController::class, 'destroy'])->name('company.destroy');

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});

require __DIR__ . '/auth.php';
