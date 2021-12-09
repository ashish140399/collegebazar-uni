import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";
import "./Profile.scss";
import { useForm } from "react-hook-form";
import BigLoader from "../../components/loading/BigLoader";
import MiniLoader from "../../components/loading/MiniLoader";
import { loadUser } from "../../services/actions/authAction";
import {
  updatePhone,
  updateRollnumber,
  updateProfileImage,
  updateStream,
} from "../../services/actions/profileAction";
// file pond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import the plugin code for filepond
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

// Register the filepond plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop
);

const Profile = ({
  profile,
  loadUser,
  updatePhone,
  updateRollnumber,
  updateProfileImage,
  updateStream,
  loading,
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser, loading]);
  // filepond image
  const [files, setFiles] = useState([]);

  const [iseditable, setIseditable] = useState(false);

  let name = profile && profile.name;

  const [phone, setPhone] = useState("");
  const [rollnum, setRollnum] = useState("");
  const [stream, setStream] = useState(undefined);
  useEffect(() => {
    if (profile) {
      setPhone(profile.phone);
      setRollnum(profile.rollNumber);
      setStream(profile.stream);
    }
  }, [profile]);

  let email = profile
    ? profile.email || profile.googleEmail || profile.facebookEmail
    : null;
  let dateToFormat = profile && profile.createdAt;

  const [openBox, setOpenBox] = useState(false);
  const [userImg, setUserImg] = useState("img/usr.jpg");

  const toggleOpenBox = () => {
    setOpenBox(!openBox);
  };

  const updateprofile = () => {
    setIseditable(false);

    if (profile.phone != phone) updatePhone(phone);
    if (profile.rollNumber != rollnum) updateRollnumber(rollnum);
    if (profile.stream != stream) updateStream(stream);
  };

  // function uploadUserImg() {}
  //   const { register, handleSubmit, errors } = useForm();
  // const onSubmit = data => {
  //   console.log("hello")
  //   data.files = files;
  //     updateProfileImage(data)
  // };
  return profile ? (
    <div className="container my-5">
      <div className="card">
        <div className="card-header user-card-header">
          <h3>User Profile</h3>
          <div className="myuser">
            {/* <FilePond
              files={files}
              allowMultiple={false}
              onupdatefiles={setFiles}
              allowImageCrop={true}
              labelFileTypeNotAllowed={"Error!"}
              acceptedFileTypes={["image/*"]}
              fileValidateTypeDetectType={(source, type) =>
                new Promise((resolve, reject) => {
                  // Do custom type detection here and return with promise
                  resolve(type);
                })
              }
              maxFiles={1}
              imagePreviewHeight={170}
              imageCropAspectRatio={"1:1"}
              imageResizeTargetWidth={200}
              imageResizeTargetHeight={200}
              stylePanelLayout={"compact circle"}
              styleLoadIndicatorPosition={"center bottom"}
              styleButtonRemoveItemPosition={"center bottom"}
              labelIdle='<span class="filepond--label-action">              <i class="fas fa-camera"></i></span>'
            /> */}
            <img src={userImg} className="defaultimg" />

            {/* <div className="imgOverlay" onClick={() => uploadUserImg()}>
              <i class="fas fa-camera"></i>

            </div> */}
          </div>
        </div>
        <div className="card-body">
          {/* <form
                 onSubmit={handleSubmit(onSubmit)}
                  className="mt-3"
                >
                  <button type="submit">Update Profile</button>
                </form> */}
          <h4 className="my-3">Welcome {name} </h4>

          <h6>
            Email : <input value={email} disabled={email} />
          </h6>
          <h6>
            Stream :{" "}
            <input
              value={stream}
              disabled={stream}
              onChange={(e) => setStream(e.target.value)}
            />
          </h6>

          <h6>
            Phone :{" "}
            <input
              value={phone}
              disabled={!iseditable}
              onChange={(e) => setPhone(e.target.value)}
            />
          </h6>
          <h6>
            Roll no. :{" "}
            <input
              value={rollnum}
              disabled={!iseditable}
              onChange={(e) => setRollnum(e.target.value)}
            />
          </h6>

          <br />

          <p className="card-text mt-3">
            {" "}
            Member Since <Moment format="DD/MM/YYYY">
              {dateToFormat}
            </Moment>{" "}
          </p>

          <button
            onClick={() => setIseditable(true)}
            className="btn btn-info mr-2"
          >
            Edit Profile
          </button>
          <button onClick={() => updateprofile()} className="btn btn-info">
            Update Profile
            {loading && <MiniLoader />}{" "}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <BigLoader />
  );
};

Profile.prototypes = {
  profile: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  updatePhone: PropTypes.func.isRequired,
  updateRollnumber: PropTypes.func.isRequired,
  updateProfileImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.auth.profile,
  loading: state.profileReducer.loading,
});

export default connect(mapStateToProps, {
  loadUser,
  updatePhone,
  updateRollnumber,
  updateProfileImage,
  updateStream,
})(Profile);
