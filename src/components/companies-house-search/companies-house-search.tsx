import { Component, h, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import _debounce from 'lodash.debounce';

@Component({
  tag: 'companies-house-search',
  styleUrl: 'companies-house-search.css',
})
export class CompaniesHouseSearch {
  @Prop()
  debounce: number = 600;

  @Prop()
  token: string = '';

  @Prop()
  placeholder: string = 'Search...';

  @State()
  private dropdownOpen: boolean = false;

  @State()
  private options: any[] = [];

  @State()
  private isLoading: boolean = false;

  @State()
  private selectedCompany: any = undefined;

  @State()
  private inputValue: string | undefined;

  @Event() businessSelected : EventEmitter<any>;

  @Watch('selectedCompany')
  private handleCompanySelect() {
    if (this.selectedCompany) {
      this.businessSelected.emit(this.selectedCompany);
      this.closeDropdown();
    }
  }

  private apiURL: string = 'https://api.company-information.service.gov.uk';

  private async getCompanies() {
    this.isLoading = true;
    const response = await fetch(`${this.apiURL}/search?q=${this.inputValue}`, {
      method: 'GET',
      headers: { Accept: 'application/json', Authorization: `Basic ${this.token}` },
    }).then(res => res.json());
    this.options = response?.items;
    this.isLoading = false;
  }

  private handleInputChange = _debounce((event: Event) => {
    this.selectedCompany = undefined;
    this.inputValue = (event.target as HTMLInputElement).value;
    if (this.inputValue?.length > 0) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }, this.debounce);

  private isDropdownButtonDisabled = () => {
    return !(this.inputValue?.length > 0);
  };

  private getInputClass() {
    return this.selectedCompany ? 'companies-house-input--selected' : 'companies-house-input';
  }

  private openDropdown = async () => {
    this.dropdownOpen = true;
    if (this.inputValue?.length > 0) {
      await this.getCompanies();
    }
  };

  private closeDropdown = () => {
    this.dropdownOpen = false;
  };

  private getDropdownButtonCallback = () => {
    if (this.dropdownOpen) {
      return this.closeDropdown();
    }
    return this.openDropdown();
  };

  private isDropdownOpen = () => {
    return this.dropdownOpen;
  };

  private getOption(option: any) {
    return `${option.title}${option.company_number ? ` - ${option.company_number}` : ``}`;
  }

  private buildDropdownContent() {
    if (!(this.inputValue?.length > 0)) {
      return <div class="companies-house-dropdown-text">Start typing to search your company</div>;
    }
    if (this.isLoading) {
      return <div class="companies-house-dropdown-text">Please wait...</div>;
    }
    if (!this.options?.length) {
      return <div class="companies-house-dropdown-text">No Results Found</div>;
    }
    return this.options.map(option => (
      <div class='companies-house-dropdown-option' onClick={() => (this.selectedCompany = option)}>
        {this.getOption(option)}
      </div>
    ));
  }

  render() {
    return (
      <div class="companies-house">
        <div class="companies-house-field" onFocusin={this.openDropdown}>
          <input
            class={this.getInputClass()}
            onInput={this.handleInputChange}
            placeholder={this.placeholder}
            value={this.selectedCompany ? this.getOption(this.selectedCompany) : this.inputValue}
          />
          <button disabled={this.isDropdownButtonDisabled()} onClick={this.getDropdownButtonCallback} class="companies-house-dropdown-button">
            <slot name="dropdown-button"></slot>
          </button>
        </div>
        {this.isDropdownOpen() && <div class="companies-house-dropdown">{this.buildDropdownContent()}</div>}
      </div>
    );
  }
}
