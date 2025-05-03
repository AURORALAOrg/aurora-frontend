import PropTypes from "prop-types";
import RenderFileUploadMessage from "@/components/chat/render-file-upload-message";
import { X } from "lucide-react";

export default function PreviewModal({
  message,
  onClose,
  onSend,
  onChangeFile,
}) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed min-h-screen w-screen top-0 left-0 flex items-center justify-center bg-black/70 z-[1000]">
      <div className="bg-dark-blue-1 p-5 flex flex-col gap-4 rounded-xl max-w-[MIN(500px,80%)] max-h-[MIN(400px,80%)] overflow-auto border border-dark-blue-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">File Preview</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-1 text-neutral-5 bg-dark-blue-4 border border-dark-blue-4 rounded-full cursor-pointer hover:bg-dark-blue-3 transition-colors size-8"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col max-w-full gap-2 mb-4">
          <RenderFileUploadMessage message={message} />
        </div>

        <div className="flex items-end justify-end gap-3 pt-2 border-t border-dark-blue-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-neutral-5 bg-dark-blue-4 rounded-lg hover:bg-dark-blue-3 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onChangeFile}
            className="px-4 py-2 text-sm text-white bg-dark-blue-4 rounded-lg hover:bg-dark-blue-3 transition-colors"
          >
            Change File
          </button>
          <button 
            onClick={onSend}
            className="px-4 py-2 text-sm font-medium text-white bg-light-blue-1 rounded-lg hover:bg-light-blue-2 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

PreviewModal.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    fileType: PropTypes.string,
    content: PropTypes.string,
    fileName: PropTypes.string,
    fileSize: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onChangeFile: PropTypes.func.isRequired,
};
