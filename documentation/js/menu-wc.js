'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontendweb documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/Activos.html" data-type="entity-link" >Activos</a>
                            </li>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" >ConfirmDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Dashboard.html" data-type="entity-link" >Dashboard</a>
                            </li>
                            <li class="link">
                                <a href="components/FiltersComponent.html" data-type="entity-link" >FiltersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Locales.html" data-type="entity-link" >Locales</a>
                            </li>
                            <li class="link">
                                <a href="components/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoComponent.html" data-type="entity-link" >LogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapaLocalesComponent.html" data-type="entity-link" >MapaLocalesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetricasGlobales.html" data-type="entity-link" >MetricasGlobales</a>
                            </li>
                            <li class="link">
                                <a href="components/Pedidos.html" data-type="entity-link" >Pedidos</a>
                            </li>
                            <li class="link">
                                <a href="components/Perfil.html" data-type="entity-link" >Perfil</a>
                            </li>
                            <li class="link">
                                <a href="components/Reportes.html" data-type="entity-link" >Reportes</a>
                            </li>
                            <li class="link">
                                <a href="components/RoleSelector.html" data-type="entity-link" >RoleSelector</a>
                            </li>
                            <li class="link">
                                <a href="components/Sidebar.html" data-type="entity-link" >Sidebar</a>
                            </li>
                            <li class="link">
                                <a href="components/TenantDetail.html" data-type="entity-link" >TenantDetail</a>
                            </li>
                            <li class="link">
                                <a href="components/Tenants.html" data-type="entity-link" >Tenants</a>
                            </li>
                            <li class="link">
                                <a href="components/ThemeSwitcher.html" data-type="entity-link" >ThemeSwitcher</a>
                            </li>
                            <li class="link">
                                <a href="components/TicketDetail.html" data-type="entity-link" >TicketDetail</a>
                            </li>
                            <li class="link">
                                <a href="components/Tickets.html" data-type="entity-link" >Tickets</a>
                            </li>
                            <li class="link">
                                <a href="components/Topbar.html" data-type="entity-link" >Topbar</a>
                            </li>
                            <li class="link">
                                <a href="components/TopbarMobile.html" data-type="entity-link" >TopbarMobile</a>
                            </li>
                            <li class="link">
                                <a href="components/Unauthorized.html" data-type="entity-link" >Unauthorized</a>
                            </li>
                            <li class="link">
                                <a href="components/Usuarios.html" data-type="entity-link" >Usuarios</a>
                            </li>
                            <li class="link">
                                <a href="components/ViewSearchFiltersComponent.html" data-type="entity-link" >ViewSearchFiltersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Visitas.html" data-type="entity-link" >Visitas</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/ClickOutsideDirective.html" data-type="entity-link" >ClickOutsideDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChileLocationsService.html" data-type="entity-link" >ChileLocationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfirmDialogService.html" data-type="entity-link" >ConfirmDialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardRealtimeService.html" data-type="entity-link" >DashboardRealtimeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterService.html" data-type="entity-link" >FilterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HbsRenderService.html" data-type="entity-link" >HbsRenderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalesService.html" data-type="entity-link" >LocalesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MachinesService.html" data-type="entity-link" >MachinesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NfcMock.html" data-type="entity-link" >NfcMock</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NfcTagsService.html" data-type="entity-link" >NfcTagsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SalesService.html" data-type="entity-link" >SalesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateEditorService.html" data-type="entity-link" >TemplateEditorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TenantsService.html" data-type="entity-link" >TenantsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TicketsService.html" data-type="entity-link" >TicketsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ViewHistoryService.html" data-type="entity-link" >ViewHistoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VisitsService.html" data-type="entity-link" >VisitsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZipExportService.html" data-type="entity-link" >ZipExportService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveFilter.html" data-type="entity-link" >ActiveFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Activo.html" data-type="entity-link" >Activo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActivoNFC.html" data-type="entity-link" >ActivoNFC</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthSession.html" data-type="entity-link" >AuthSession</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendNfcTag.html" data-type="entity-link" >BackendNfcTag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendNfcTagsResponse.html" data-type="entity-link" >BackendNfcTagsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendSale.html" data-type="entity-link" >BackendSale</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendSalesResponse.html" data-type="entity-link" >BackendSalesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendStore.html" data-type="entity-link" >BackendStore</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendStoresResponse.html" data-type="entity-link" >BackendStoresResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendTenant.html" data-type="entity-link" >BackendTenant</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendTicket.html" data-type="entity-link" >BackendTicket</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendTicketsResponse.html" data-type="entity-link" >BackendTicketsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendUser.html" data-type="entity-link" >BackendUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendUsersResponse.html" data-type="entity-link" >BackendUsersResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendVisit.html" data-type="entity-link" >BackendVisit</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendVisitsResponse.html" data-type="entity-link" >BackendVisitsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Comuna.html" data-type="entity-link" >Comuna</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfirmDialogData.html" data-type="entity-link" >ConfirmDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateTenantForm.html" data-type="entity-link" >CreateTenantForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateTenantRequest.html" data-type="entity-link" >CreateTenantRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateUserRequest.html" data-type="entity-link" >CreateUserRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DashboardMetrics.html" data-type="entity-link" >DashboardMetrics</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditTenantForm.html" data-type="entity-link" >EditTenantForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterConfig.html" data-type="entity-link" >FilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterOption.html" data-type="entity-link" >FilterOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterResults.html" data-type="entity-link" >FilterResults</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Local.html" data-type="entity-link" >Local</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Local-1.html" data-type="entity-link" >Local</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginRequest.html" data-type="entity-link" >LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link" >LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginUserResponse.html" data-type="entity-link" >LoginUserResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Machine.html" data-type="entity-link" >Machine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineResponse.html" data-type="entity-link" >MachineResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetricaCard.html" data-type="entity-link" >MetricaCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavItem.html" data-type="entity-link" >NavItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NFC.html" data-type="entity-link" >NFC</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification-1.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pedido.html" data-type="entity-link" >Pedido</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Region.html" data-type="entity-link" >Region</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tenant.html" data-type="entity-link" >Tenant</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TenantDetailViewModel.html" data-type="entity-link" >TenantDetailViewModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ticket.html" data-type="entity-link" >Ticket</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateTenantRequest.html" data-type="entity-link" >UpdateTenantRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateUserRequest.html" data-type="entity-link" >UpdateUserRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewRoute.html" data-type="entity-link" >ViewRoute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Visita.html" data-type="entity-link" >Visita</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});