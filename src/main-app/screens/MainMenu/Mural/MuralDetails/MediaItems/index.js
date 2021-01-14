import React from "react";

import ImageItem from "./ImageItem";
import VideoItem from "./VideoItem";
import PdfItem from "./PdfItem";

import API from "../../../../../services/axios-instance";

const API_baseURLFiles = API.defaults.baseURL + "/files/";

export default function EventosMedia(props) {
    const file = props.file;
    let mediaItem;

    switch (file.mimetype) {
        case "image/png":
            mediaItem = (
                <ImageItem
                    baseURL={API_baseURLFiles}
                    filename={file.filename}
                />
            );
            break;
        case "image/jpg":
            mediaItem = (
                <ImageItem
                    baseURL={API_baseURLFiles}
                    filename={file.filename}
                />
            );
            break;
        case "image/jpeg":
            mediaItem = (
                <ImageItem
                    baseURL={API_baseURLFiles}
                    filename={file.filename}
                />
            );
            break;
        case "video/mp4":
            mediaItem = (
                <VideoItem
                    baseURL={API_baseURLFiles}
                    filename={file.filename}
                />
            );
            break;
        case "application/pdf":
            mediaItem = (
                <PdfItem
                    baseURL={API_baseURLFiles}
                    filename={file.filename}
                    fileoriginalname={file.originalname}
                />
            );
            break;
        default:
            break;
    }

    return mediaItem || null;
}
