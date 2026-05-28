"use client";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function DeleteModal({
  onConfirm,
  onCancel,
  loading,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl">
        {/* Icon */}
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h3 className="text-[17px] font-bold text-gray-900 text-center mb-1">
          Delete post
        </h3>
        <p className="text-[14px] text-gray-500 text-center mb-6">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 h-10 border border-gray-200 hover:border-gray-300 text-gray-600 text-[14px] font-medium rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 h-10 bg-red-500 hover:bg-red-600 text-white text-[14px] font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Deleting...
              </>
            ) : (
              "Delete post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
