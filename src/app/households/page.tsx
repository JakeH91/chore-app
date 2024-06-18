import { createHousehold } from '@app/actions/database/household';

export const Households = () => {
  return (
    <form className="flex flex-col gap-4" action={createHousehold}>
      <label htmlFor="name">Address:</label>
      <input
        className="border"
        type="text"
        id="address"
        name="address"
        required
      />
      <button
        className="w-max self-end py-2 px-4 border rounded text-sm text-white bg-green-600"
        type="submit"
      >
        Create Household
      </button>
    </form>
  );
};

export default Households;
