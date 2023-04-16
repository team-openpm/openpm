import { NextResponse } from 'next/server';

import { getPackageById } from '@/server/db/packages/getters';
import { error } from '@/server/helpers/error';

// Retrive a package

async function endpoint(req: Request, { params }: { params: { packageId: string; }; }) {
  const pkg = await getPackageById(params.packageId);

  if (!pkg) {
    return error('Package not found', 'not_found', 404);
  }

  return NextResponse.json({
    id: pkg.id,
    domain: pkg.domain,
    openapi: pkg.openapi,
    name: pkg.name,
    machine_name: pkg.machine_name,
    version: pkg.version,
    user_id: pkg.user_id,
    logo_url: pkg.logo_url,
    contact_email: pkg.contact_email,
    description: pkg.description,
    machine_description: pkg.machine_description,
    legal_info_url: pkg.legal_info_url,
  });
}

export default endpoint;