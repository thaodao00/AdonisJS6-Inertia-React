
import Categories from '~/components/admin/Categories'
import ModalCreateCategory from '~/components/admin/ModalCreateCategory'
import useModal from '~/hooks/useModal'
import LayoutAdmin from '~/layouts/LayoutAdmin'

function List() {
  const modelCreateCategory = useModal()

 
  return (
    <LayoutAdmin>
      <div className="text-end">
        <button
          onClick={modelCreateCategory.openModal}
          className="bg-blue-500 px-3 py-2 rounded-md text-white"
        >
          Create
        </button>
      </div>
      {modelCreateCategory.isOpen && <ModalCreateCategory close={modelCreateCategory.closeModal} />}
      <Categories />
    </LayoutAdmin>
  )
}

export default List
