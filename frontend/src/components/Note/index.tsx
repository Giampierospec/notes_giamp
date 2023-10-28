import React, { useCallback } from 'react';
import FlexDiv from '../FlexDiv';
import Heading from '../Heading';
import CustomText from '../CustomText';
import Card from '../Card';
import dayjs from 'dayjs';
import CustomLink from '../CustomLink';
import CustomButton from '../CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '../../store/hooks';
import { deleteNote, updateTitle } from '../../store/reducers/note.reducer';
import useOpen from '../../hooks/useOpen';
import Modal from '../Modal';
import CustomInput from '../CustomInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { noteSchemaActions } from '../../validationSchema/note-schema';
import { UpdateTitleFormValues } from '../../interfaces/note.interface';
import { formatCurrency } from '../../helpers/utils.helper';
interface NoteProps {
  _id: string;
  title: string;
  created?: Date;
  updated?: Date;
  color?: string;
  arithmetics: {
    numbers: { description?: string; digits: number }[];
    total?: number;
  };
  content?: string;
}
const Note = React.forwardRef<
  HTMLDivElement,
  NoteProps & React.HTMLAttributes<HTMLDivElement>
>(
  ({
    _id,
    title,
    created,
    updated,
    color = '#FFF',
    arithmetics,
    content,
    ...rest
  }) => {
    const dispatch = useAppDispatch();
    const onDelete = useCallback(async () => {
      await dispatch(deleteNote(_id));
    }, []);
    const { isOpen, onOpen, onClose } = useOpen();
    const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
    } = useForm<{ title: string }>({
      defaultValues: { title },
      resolver: yupResolver(noteSchemaActions['updateTitle']),
    });
    const updateTitleAction = useCallback(
      async (values: UpdateTitleFormValues) => {
        await dispatch(updateTitle(values));
        onClose();
      },
      []
    );

    return (
      <>
        <Card className={`bg-[${color}] ${rest.className}`}>
          <CustomText
            variant="custom"
            className="italic text-gray-400 text-sm flex justify-end"
          >
            {dayjs(created).format('MM/DD/YYYY')}
          </CustomText>
          <FlexDiv className="justify-between">
            <Heading
              className="uppercase hover:opacity-75 hover:cursor-pointer"
              onClick={onOpen}
            >
              {title}
            </Heading>
            <CustomLink to={`/update-note/${_id}`}>
              <CustomButton type="button" variant="secondary">
                <FontAwesomeIcon icon={['fas', 'edit']} />
              </CustomButton>
            </CustomLink>
          </FlexDiv>
          <CustomText variant="custom" className="italic text-gray-400 text-sm">
            updated: {dayjs(updated).format('MM/DD/YYYY hh:mm A Z')}
          </CustomText>
          {content && (
            <div
              className="prose lg:prose-xl"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          {arithmetics?.numbers && arithmetics?.numbers?.length > 0 && (
            <>
              <Heading variant="h4">Arithmetics</Heading>
              <table className="table-auto border-spacing-2  border-collapse border border-slate-500">
                <thead>
                  <tr className="bg-slate-600 text-white">
                    <th>Description</th>
                    <th>Numbers</th>
                  </tr>
                </thead>
                <tbody>
                  {arithmetics?.numbers?.map((x, i) => (
                    <tr key={i}>
                      <td className="border border-slate-600 px-2">
                        <CustomText>{x.description}</CustomText>
                      </td>
                      <td className="border border-slate-600 px-2">
                        <CustomText>{formatCurrency(x.digits)}</CustomText>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-700 text-white">
                    <td className="border border-slate-600 px-2">
                      <CustomText variant="custom">Total:</CustomText>
                    </td>
                    <td className="border border-slate-600 px-2">
                      <CustomText variant="custom">
                        {formatCurrency(arithmetics.total)}
                      </CustomText>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          <FlexDiv className="justify-end">
            <CustomButton
              variant="danger"
              className="rounded-md"
              onClick={onDelete}
            >
              <FontAwesomeIcon icon={['fas', 'trash']} />
            </CustomButton>
          </FlexDiv>
        </Card>
        <Modal isOpen={isOpen} onClose={onClose} title="Update Title">
          <form
            onSubmit={handleSubmit(
              async (values) => await updateTitleAction({ ...values, id: _id })
            )}
          >
            <FlexDiv className="items-center">
              <CustomText>Title</CustomText>
              <CustomInput
                type="text"
                {...register('title')}
                disabled={isSubmitting}
                required={!!errors.title}
              />
            </FlexDiv>
          </form>
        </Modal>
      </>
    );
  }
);

export default Note;
