import FilterCountry from "./FilterCountry";
import FilterLanguage from "./FilterLanguage";
import FilterName from "./FilterName";

function FilterBox() {
    return (
        <div className="filter-box">
            <FilterCountry />
            <FilterLanguage />
            <FilterName />
        </div>
    );
}

export default FilterBox;
