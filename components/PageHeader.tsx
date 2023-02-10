'use client';

import { isEntry, LoreSchemas } from '@/types';
import { Session } from 'next-auth';
import { Dispatch, SetStateAction, useState } from 'react';
import AlertDialog from './AlertDialog';
import SharingModal from './SharingModal';

type Props<T extends LoreSchemas> = {
  data: T;
  currentData: T;
  setData: Dispatch<SetStateAction<T>>;
  onSave: () => Promise<void>;
  onDelete: () => Promise<void>;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>
  permissions: string[];
  session: Session;
};

const PageHeader = <T extends LoreSchemas>({
  data,
  currentData,
  setData,
  onSave,
  onDelete,
  editMode,
  setEditMode,
  permissions,
  session,
}: Props<T>) => {
  const [showModal, setShowModal] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <div className='flex justify-end items-center w-full py-2 px-4 bg-white mb-[2px]'>
        <div className='flex items-center gap-4 h-11'>
          <div className='flex items-center h-8 gap-2 overflow-x-clip'>
            {!isEntry(data) &&
              data.readers.map((reader, index) => (
                <img
                  className='w-8 h-8 rounded-full min-w-max'
                  src='/no-profile-picture.svg'
                  alt=''
                  key={index}
                />
              ))}
          </div>
          <div className='flex gap-4 min-w-max'>
            {permissions.includes('admin') && editMode && (
              <button
                className='flex justify-center items-center py-3 px-4 gap-2 h-11 w-[100px] rounded-lg border-2 text-[16px] font-medium bg-white border-lore-beige-500 text-lore-blue-400 transition-all duration-300 ease-out hover:bg-lore-beige-400'
                onClick={() => setShowModal(!showModal)}
              >
                {isEntry(data) ? 'Visibility' : 'Sharing'}
              </button>
            )}
            {permissions.includes('writer') && editMode && (
              <>
                <button
                  className='flex justify-center items-center py-3 px-4 gap-2 h-11 w-[100px] rounded-lg text-[16px] font-medium bg-lore-red-400 text-white transition-all duration-300 ease-out hover:bg-lore-red-500'
                  onClick={() => {
                    onSave();
                    setEditMode(false);
                  }}
                >
                  Save
                </button>
                <button
                  className='flex justify-center items-center py-3 px-4 gap-2 h-11 w-[100px] rounded-lg text-[16px] font-medium bg-lore-red-400 text-white transition-all duration-300 ease-out hover:bg-lore-red-500'
                  onClick={() => {
                    setEditMode(false);
                    setData(currentData);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
            {permissions.includes('writer') && !editMode && (
              <button
                className='flex justify-center items-center py-3 px-4 gap-2 h-11 w-[100px] rounded-lg text-[16px] font-medium bg-lore-red-400 text-white transition-all duration-300 ease-out hover:bg-lore-red-500'
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            )}
            {permissions.includes('admin') && editMode && (
              <button
                className='flex justify-center items-center py-3 px-4 gap-2 h-11 w-[100px] rounded-lg text-[16px] font-medium bg-lore-red-400 text-white transition-all duration-300 ease-out hover:bg-lore-red-500'
                onClick={() => setAlertOpen(true)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <SharingModal
          setShowModal={setShowModal}
          data={data}
          setData={setData}
          session={session}
        />
      )}
      {alertOpen &&
        (isEntry(data) ? (
          <AlertDialog
            title={`Delete ${data.name}?`}
            alertOpen={alertOpen}
            setAlertOpen={setAlertOpen}
            action={onDelete}
          />
        ) : (
          <AlertDialog
            title={'Delete this World?'}
            description={
              'Doing so will permanently delete the data in this world, including all nested entries.'
            }
            confirmText={`Confirm that you want to delete this world by typing in its name:`}
            confirmValue={data.name}
            alertOpen={alertOpen}
            setAlertOpen={setAlertOpen}
            action={onDelete}
          />
        ))}
    </>
  );
};

export default PageHeader;
