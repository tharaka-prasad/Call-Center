<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Product List
     */
    public function index()
    {
    }

    /**
     * Create Product + Models
     */
    public function store(Request $request)
    {
        $request->validate([
            'productName' => 'required|string|max:255',
            'models' => 'required|array|min:1',
            'models.*.productModel' => 'required|string|max:255',
            'models.*.price' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {

            $product = Product::create([
                'productName' => $request->productName,
            ]);

            foreach ($request->models as $model) {
                ProductModel::create([
                    'productId' => $product->id,
                    'productModel' => $model['productModel'],
                    'price' => $model['price'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Product created successfully',
                'data' => $product->load('models')
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Update Product + Models
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'productName' => 'required|string|max:255',
            'models' => 'required|array|min:1',
            'models.*.productModel' => 'required|string|max:255',
            'models.*.price' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {

            $product = Product::findOrFail($id);

            $product->update([
                'productName' => $request->productName,
            ]);

            // old models delete
            ProductModel::where('productId', $product->id)->delete();

            // new models insert
            foreach ($request->models as $model) {
                ProductModel::create([
                    'productId' => $product->id,
                    'productModel' => $model['productModel'],
                    'price' => $model['price'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Product updated successfully',
                'data' => $product->load('models')
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete Product + Models
     */
    public function destroy($id)
    {
        DB::beginTransaction();

        try {

            $product = Product::findOrFail($id);

            ProductModel::where('productId', $product->id)->delete();

            $product->delete();

            DB::commit();

            return response()->json([
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
