<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('call_recordes', function (Blueprint $table) {
            $table->id();
            $table->string('CustomerName')->nullable();
            $table->string('CustomerPhoneNumber')->nullable();
            $table->string('CustomerAddress')->nullable();
            $table->string('CustomerEmail')->nullable();
            $table->string('CustomerCompany')->nullable();
            $table->string('product')->nullable();
            $table->integer('reason')->nullable();
            $table->enum('status', [
                'pending',
                'complete',
                'close',
                'fail',
            ])->default('pending')->nullable();
            $table->integer('CompanyId')->nullable();
            $table->text('fail_reason')->nullable();
            $table->integer('callback_days')->nullable();
            $table->integer('CreatedBy')->nullable();
            $table->dateTime('callback_date')->nullable();
            $table->text('callback_note')->nullable();
            $table->string('callback_time')->nullable();
            $table->enum('is_callback_done', ['yes', 'no'])->default('no')->nullable();

            $table->text('callback_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('call_recordes');
    }
};
